import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/admin-dashboard" },
    { name: "Recipes", path: "/recipes" },
    { name: "Users", path: "/users" },
    { name: "RecieptManagement", path: "/receiptmanagement" },
  ];

  return (
    <aside
      style={{
        width: "240px",
        backgroundColor: "#fff",
        minHeight: "100vh",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        borderRight: "1px solid #EEECE7",
        display: "flex",
        flexDirection: "column",
        padding: "24px 16px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Modern Back Button */}
      <div
        onClick={() => navigate("/")}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          padding: "12px 0",
          marginBottom: "24px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #702FB1, #9C5DE5)",
          color: "#fff",
          fontWeight: "600",
          fontSize: "1rem",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        <FiArrowLeft size={18} style={{ marginRight: "8px" }} />
        Back to Home
      </div>

      {/* Sidebar Title */}
      <h2
        style={{
          color: "#0B1F3A",
          marginBottom: "32px",
          fontWeight: "700",
          fontSize: "1.8rem",
          textAlign: "center",
        }}
      >
        Admin
      </h2>

      {/* Sidebar Menu */}
      {menuItems.map((item) => {
        const active = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            style={{
              textDecoration: "none",
              color: active ? "#702FB1" : "#1C2C46",
              fontWeight: active ? "700" : "600",
              fontSize: "1.1rem",
              padding: "12px 16px",
              marginBottom: "8px",
              borderRadius: "12px",
              backgroundColor: active ? "#F7F6F2" : "transparent",
              transition: "all 0.2s ease",
              display: "block",
            }}
          >
            {item.name}
          </Link>
        );
      })}
    </aside>
  );
};

export default AdminSidebar;
