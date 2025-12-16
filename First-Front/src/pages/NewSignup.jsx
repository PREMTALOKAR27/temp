import React, { useState } from "react";
import axios from "axios";
import pageBg from "../assets/pagebg.jpg";

const NewSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER", // default role
    phone_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://first-buy.in/api/v1/users/signup",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Signup success:", res.data);
      alert("Signup successful!");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert("Signup failed: " + (error.response?.data?.message || "Error"));
    }
  };

  return (
    <div
      className="relative flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${pageBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#3D4662", // fallback dark shade
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative bg-white shadow-2xl rounded-2xl p-12 w-full max-w-lg z-10">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Create Your Account
        </h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          Join First Buy and start your journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name*"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address*"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-5 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password*"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-5 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number*"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full px-5 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Role dropdown */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-5 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="USER">USER</option>
            <option value="BUILDER">BUILDER</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 text-lg font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-base text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-medium hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default NewSignup;
