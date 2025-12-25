import express from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/* ================= GOOGLE LOGIN ================= */
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const emailDomain = payload.email.split("@")[1];

    /* ✅ DOMAIN CHECK (KEPT AS-IS) */
    if (emailDomain !== process.env.ALLOWED_DOMAIN) {
      return res
        .status(403)
        .json({ message: "Login failed: Please use your GDGU college email" });
    }

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
        isWhitelisted: false, // 🔒 default blocked
      });
    }

    // 🔒 WHITELIST CHECK (NEW)
    if (!user.isWhitelisted) {
      return res.status(403).json({
        message: "Access denied. Contact admin for approval.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "User disabled" });
    }

    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
    });

    res.json({ success: true });
  } catch (err) {
    res.status(401).json({ message: "Google authentication failed" });
  }
});

/* ================= AUTH CHECK ================= */
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

/* ================= LOGOUT ================= */
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
});

/* ================= ADMIN CRUD ================= */

/* Get all users */
router.get("/admin/users", protect, authorize("admin"), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

/* Update role / whitelist / active */
router.put("/admin/user/:id", protect, authorize("admin"), async (req, res) => {
  const { role, isActive, isWhitelisted } = req.body;

  await User.findByIdAndUpdate(req.params.id, {
    role,
    isActive,
    isWhitelisted,
  });

  res.json({ success: true });
});

/* Delete user */
router.delete("/admin/user/:id", protect, authorize("admin"), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
