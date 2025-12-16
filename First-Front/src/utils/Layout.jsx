import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { authStore } from "../store/authStore";
import Header from "../components/Header";
import NewNav from "../components/NewNav";

const Layout = () => {
  const navigate = useNavigate();
  const { authData } = authStore();
  const location = useLocation();

  // Pages where navbar & footer should be hidden
  const noNavFooterPages = [
    "/login",
    "/signup",
    "/otp-verification",
    "/reset-password",
  ];

  const hideNavFooter = noNavFooterPages.includes(location.pathname);

  const goToAdmin = () => {
    navigate("/admin-dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavFooter && <NewNav />}

      <main className="flex-1">
        <Outlet />
      </main>

      {!hideNavFooter && <Footer />}

      {/* Admin Floating Button */}
      {authData?.role === "ADMIN" && (
        <button
          onClick={goToAdmin}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            padding: "14px 20px",
            borderRadius: "50px",
            border: "2px solid rgba(255,255,255,0.7)",
            backgroundColor: "rgba(0,0,0,0.3)",
            color: "white",
            backdropFilter: "blur(5px)",
            cursor: "pointer",
            zIndex: 9999,
            fontWeight: 500,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.5)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.3)")}
        >
          Admin
        </button>
      )}
    </div>
  );
};

export default Layout;
