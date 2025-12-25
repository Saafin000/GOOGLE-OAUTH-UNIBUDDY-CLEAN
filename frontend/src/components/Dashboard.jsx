import { useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Student Dashboard 🎓</h1>
        <p className="dashboard-text">You are logged in as a student.</p>
        <button className="btn logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Embedded CSS */}
      <style>{`
        .dashboard-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea, #764ba2);
          font-family: 'Poppins', sans-serif;
        }
        .dashboard-card {
          background: #fff;
          padding: 50px 40px;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .dashboard-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.25);
        }
        .dashboard-title {
          font-size: 2.5rem;
          margin-bottom: 15px;
          color: #333;
        }
        .dashboard-text {
          font-size: 1.2rem;
          color: #555;
          margin-bottom: 30px;
        }
        .btn.logout-btn {
          background: linear-gradient(135deg, #ff5f5f, #ff2f2f);
          color: #fff;
          border: none;
          padding: 12px 30px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .btn.logout-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(255,95,95,0.5);
        }
      `}</style>
    </div>
  );
}
