import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RoleRedirect() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  if (user.role === "admin") return <Navigate to="/admin" />;
  if (user.role === "student") return <Navigate to="/dashboard" />;

  return <Navigate to="/dashboard" />;
}
