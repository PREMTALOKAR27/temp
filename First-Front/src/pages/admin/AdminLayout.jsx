import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F7F6F2" }}>
      <AdminSidebar />
      <main style={{ flex: 1 }}>
        <Outlet /> 
      </main>
    </div>
  );
};

export default AdminLayout;
