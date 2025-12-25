import { useEffect } from "react";
import axios from "axios";

export default function Login() {
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleLogin,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      {
        theme: "outline",
        size: "large",
        shape: "pill",
        width: 260,
      }
    );
  }, []);

  const handleGoogleLogin = async (response) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
        { token: response.credential },
        { withCredentials: true }
      );

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Google Login Failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoWrapper}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
            alt="Google Logo"
            style={styles.logo}
          />
        </div>
        <h2 style={styles.heading}>Welcome Back 👋</h2>
        <p style={styles.text}>Sign in using your Google account</p>
        <div
          id="googleSignInDiv"
          style={styles.googleButtonContainer}
          className="google-button-container"
        />
      </div>
      <style>{interactiveStyles}</style>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    fontFamily: "'Poppins', sans-serif",
    padding: "20px",
  },
  card: {
    background: "#fff",
    padding: "50px 40px",
    borderRadius: "20px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  logoWrapper: {
    marginBottom: "20px",
  },
  logo: {
    width: "60px",
    height: "60px",
    animation: "bounce 1.5s infinite",
  },
  heading: {
    marginBottom: "10px",
    fontSize: "24px",
    fontWeight: 600,
    color: "#333",
  },
  text: {
    marginBottom: "30px",
    color: "#555",
    fontSize: "16px",
  },
  googleButtonContainer: {
    display: "flex",
    justifyContent: "center",
  },
};

// Extra CSS for animations & hover effects
const interactiveStyles = `
.google-button-container button {
  transition: all 0.3s ease !important;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;
  border-radius: 12px !important;
}

.google-button-container button:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2) !important;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 35px 60px rgba(0,0,0,0.25);
}
`;
