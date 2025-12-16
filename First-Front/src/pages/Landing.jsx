import { useNavigate } from "react-router-dom";
import propertyWomanImage from "../assets/Landing/property-woman.jpg";
import propertyImage from "../assets/Landing/Home.jpg";
import build from "../assets/building1.png";
import background from "../assets/pagebg.jpg";
import { features, testimonials } from "../constants/data";

function Landing() {
  const navigate = useNavigate();

  // Define routes for each feature card
  const featureRoutes = [
    "/transaction-brokerage",
    "/bill-scan",
    "/points-dashboard",
    "/properties",
  ];

  return (
    <div>
      <div className="bg-gray-100 flex flex-col">
        <div className="w-full">
          <img
            src={propertyImage}
            alt="Modern Property"
            className="w-full max-h-[260px] sm:max-h-[360px] md:max-h-[400px] object-cover"
            loading="lazy"
          />
        </div>

        {/* Hero Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10 py-8 sm:py-12 px-4 sm:px-6 md:px-20">
          {/* Left */}
          <div className="w-full md:w-1/2 flex justify-center order-1 md:order-1">
            <img
              src={propertyWomanImage}
              alt="Woman scanning bills"
              className="rounded-xl w-full max-w-md object-cover shadow-md"
            />
          </div>

          {/* Right */}
          <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-2">
            <h1 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 leading-snug">
              Turn Everyday Bills into Property Credit
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-5 sm:mb-6">
              Scan, earn points, and redeem towards your first home.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
  <a
    href="/"
    className="text-white px-6 py-2 rounded-full hover:opacity-90 transition"
    style={{
      borderRadius: "6px",
      background:
        "linear-gradient(104.04deg, #0D8AFE 0%, #DA89FF 100%)",
      textDecoration: "none",
    }}
  >
    How it Works
  </a>
  <a
    href="/properties"
    className="bg-white border border-gray-300 px-6 py-2 rounded-full hover:bg-gray-200 transition"
    style={{ borderRadius: "6px", textDecoration: "none" }}
  >
    Get Started
  </a>
</div>

          </div>
        </div>
      </div>

      <section className="relative py-16 px-4 sm:px-6 lg:px-8 text-white">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-[#0B1518] opacity-70"
          style={{ backgroundBlendMode: "overlay" }}
        ></div>

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
        ></div>

        <div
          className="absolute inset-0 bg-[#0B1518] opacity-70"
          style={{ backgroundBlendMode: "multiply" }}
        ></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto">
          <h2 className="text-center text-3xl sm:text-4xl font-semibold mb-12">
            FEATURES
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                onClick={() => navigate(featureRoutes[idx])}
                className="cursor-pointer bg-gradient-to-b from-indigo-500 to-purple-700 rounded-2xl p-6 shadow-xl space-y-4 hover:scale-105 transition-transform duration-300"
              >
                <div className="text-white">{feature.icon}</div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-sm text-white/90">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
