import React from "react";

import image1 from "../assets/building1.png";
import image2 from "../assets/building1.png";
import image3 from "../assets/building1.png";
import image4 from "../assets/building1.png";
import image5 from "../assets/building1.png";

export default function Homepage() {
  return (
    <div className="font-sans text-gray-800">

      {/* Hero Section (custom one from LandingPage) */}
      <section className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-16 text-white">
        <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
          <img
            src={image1}
            alt="Hero"
            className="rounded-lg w-full max-w-md shadow-xl"
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Unlock Your Path to Homeownership Today
          </h2>
          <p className="text-lg mb-6">
            Experience the simplicity of converting everyday expenses into valuable rewards.
            With instant points and long-term savings, First-Buy makes homeownership achievable.
          </p>
          <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="bg-gray-100 py-16 px-4 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-12 max-w-3xl mx-auto leading-snug">
          Transform Your Everyday Expenses into Homeownership Benefits in 4 Simple Steps
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded shadow-lg hover:shadow-xl transition">
            <img
              src={image2}
              alt="Step 1"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h4 className="font-bold text-lg mb-2">Upload Your Monthly Bills</h4>
            <p className="text-gray-600 text-sm">
              Share receipts from groceries, fuel, dining, or utility payments directly through First-Buy and start collecting rewards instantly.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded shadow-lg hover:shadow-xl transition">
            <img
              src={image3}
              alt="Step 2"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h4 className="font-bold text-lg mb-2">Get Rewarded Instantly</h4>
            <p className="text-gray-600 text-sm">
              Earn Points for Every ₹100 You Spend. Points are credited directly to your First-Buy wallet.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded shadow-lg hover:shadow-xl transition">
            <img
              src={image4}
              alt="Step 3"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h4 className="font-bold text-lg mb-2">Unlock Premium Offers</h4>
            <p className="text-gray-600 text-sm">
              Use your points to unlock homebuying discounts and partner-only offers from top builders.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded shadow-lg hover:shadow-xl transition">
            <img
              src={image5}
              alt="Step 4"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h4 className="font-bold text-lg mb-2">Save Big on Your First Home</h4>
            <p className="text-gray-600 text-sm">
              Redeem your collected points as savings on your first property purchase with First-Buy.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
