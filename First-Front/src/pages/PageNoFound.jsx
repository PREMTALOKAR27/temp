import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen fixed w-screen -z-10 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800">
      <h1 className="text-7xl font-extrabold text-orange-500 mb-2 animate-bounce">
        404
      </h1>
      <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <button
        onClick={() => navigate("/")}
        style={{borderRadius: 50}}
          className="px-6 py-3 my-1 bg-orange-500 hover:bg-orange-600 text-white shadow-black shadow-lg transition duration-200 font-semibold rounded-2xl"
      >
        ⬅ Back to Home
      </button>
    </div>
  );
}

export default PageNotFound;
