import React, { useState, useEffect } from "react";
import pageBg from "../assets/pagebg.jpg";
import { useNavigate } from "react-router-dom";

const NewLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // -- STEP 1: Handle Google OAuth redirect --
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const name = params.get("name");
    const role = params.get("role");
    const id = params.get("id");

    if (token && name) {
      console.log("Google OAuth Params:", { token, name, role, id });

      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", id);

      // Clear URL params so user sees clean URL
      window.history.replaceState({}, document.title, "/");

      // Redirect to home/dashboard
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // -- STEP 2: Handle email/password login --
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("https://first-buy.in/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("userId", data.user.id);
      }

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to backend endpoint that triggers Google OAuth
    window.location.href = "https://first-buy.in/oauth2/authorize/google";
  };

  return (
    <div
      style={{
        backgroundImage: `url(${pageBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#3D4662",
      }}
      className="relative flex justify-center items-center min-h-screen"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative bg-white shadow-2xl rounded-2xl p-12 w-full max-w-lg z-10">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Welcome Back to First Buy
        </h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          Please login to your account
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-600 p-3 rounded-lg mb-4 text-center">
            {success}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border px-5 py-3 rounded-xl mb-4 hover:bg-gray-100"
        >
          <img
            src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo.png"
            alt="Google Logo"
            className="w-5"
          />
          Sign in with Google
        </button>

        <p className="text-center my-2">— or —</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email address*"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password*"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-black py-3 text-lg font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-base text-gray-600 mt-6 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default NewLogin;
