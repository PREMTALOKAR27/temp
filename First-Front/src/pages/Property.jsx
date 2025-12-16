import { FaSearch } from "react-icons/fa";
import PropertyCard from "../components/PropertyCard";
import { propertyStore } from "../store/propertyStore";
import { useEffect } from "react";
import image from "../assets/Townhouse.jpg";
import propertyImage from "../assets/home.jpg";

const Property = () => {
  const { fetchAll, allProperties, loading } = propertyStore();

  const getImageSrc = (imageArray) => {
    if (imageArray && imageArray.length > 0) {
      return `data:image/jpeg;base64,${imageArray[0]}`;
    }
    return propertyImage; // fallback
  };

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex w-full h-[650px]">
        <div
          className="absolute top-0 left-0"
          style={{
            width: "437px",
            height: "650px",
            background: "#702FB1",
            opacity: 0.9,
          }}
        ></div>

        <div className="relative flex-1 h-full ml-[437px]">
          <img
            src={image}
            alt="Property"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(270deg, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0) 70%)",
            }}
          ></div>
        </div>

        <div
          className="absolute text-white z-10 flex flex-col items-start space-y-6"
          style={{ width: "830px", top: "193px", left: "159px" }}
        >
          <h1
            className="font-[600] text-[54px] leading-[100%] text-left"
            style={{ fontFamily: "Montserrat" }}
          >
            Let us Find your future Home
          </h1>

          <p className="text-lg text-left" style={{ fontFamily: "Montserrat" }}>
            Find the house of your dreams.
          </p>

          <div
            className="flex items-center rounded-xl overflow-hidden shadow-md w-[630px] max-w-full px-2"
            style={{ background: "#D9D9D9" }}
          >
            <select className="px-4 py-3 text-gray-700 outline-none bg-transparent">
              <option>Available Properties</option>
              <option>Houses</option>
              <option>Apartments</option>
            </select>

            <div className="flex items-center flex-1 px-4">
              <FaSearch className="text-gray-600 mr-2" />
              <input
                type="text"
                placeholder="Search for properties or keywords"
                className="flex-1 py-3 outline-none text-gray-700 bg-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <div
        style={{
          backgroundColor: "#AFD2E5",
          minHeight: "100vh",
          padding: "80px 0",
        }}
      >
        <h2
          className="font-[600] text-[54px] leading-[100%] text-center"
          style={{ fontFamily: "Poppins", marginBottom: "40px" }}
        >
          Properties for Sale
        </h2>
        <p
          className="text-center text-lg max-w-3xl mx-auto"
          style={{ fontFamily: "Poppins", marginBottom: "40px" }}
        >
          Fulfill your career dreams, enjoy all the achievements of the city
          center and luxury housing to the fullest
        </p>

        {/* Cards Grid */}
        <div className="flex flex-wrap justify-center gap-8 px-6">
          {allProperties.length > 0 ? (
            allProperties.map((property) => (
              <PropertyCard
                key={property.id}
                image={getImageSrc(property.images)}
                title={property.title || property.name || "Untitled Property"}
                price={`Rs ${property.price?.toLocaleString() || 0}`}
                location={property.location || "Unknown"}
              />
            ))
          ) : !loading ? (
            <p className="text-center w-full text-lg">No properties found.</p>
          ) : null}
        </div>

        {/* Loading Phase at the bottom */}
        {loading && (
          <div className="w-full flex justify-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-700"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Property;
