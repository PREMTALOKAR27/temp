// src/pages/NewProperties.jsx
import React, { useState, useEffect } from "react";
import { FaSearch, FaBed, FaBath, FaRulerCombined, FaTree, FaShieldAlt, FaParking, FaSeedling } from "react-icons/fa";
import axios from "../config/AxiosInterceptor";
import {
  Container,
  Grid,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
} from "@mui/material";
import heroImg from "../assets/hero.png";

// PropertyCard component
const PropertyCard = ({ property, onSelect }) => {
  const {
    images = [],
    name,
    price,
    location,
    discount,
    description,
    features,
    builder,
    contact,
    pointsRequired,
    points,
    subtitle,
    isNew,
    propertySpecifications,
    amenities 
  } = property;

  const beds = propertySpecifications?.bedrooms;
const baths = propertySpecifications?.bathrooms;
const sqFt = propertySpecifications?.areaSqFt;

const amenityList = Object.keys(amenities || {})
  .filter(key => amenities[key]) // only true values
  .map(key =>
    key
      .replace("has", "")
      .replace(/([A-Z])/g, " $1")
      .trim()
  );

  // Support both shapes: [urlString], [base64String], or [{ url: string }]
  const getImageSources = () => {
    if (!images || images.length === 0) return ["https://via.placeholder.com/800x600?text=No+Image"];
    return images.map((img) => {
      if (typeof img === "object" && img?.url) return img.url;
      if (typeof img === "string" && (img.startsWith("http://") || img.startsWith("https://"))) return img;
      if (typeof img === "string" && img.startsWith("data:")) return img;
      return `data:image/jpeg;base64,${img}`;
    });
  };
  const imageSources = getImageSources();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const mainImage = imageSources[currentImageIndex] ?? "https://via.placeholder.com/800x600?text=No+Image";

  const effectivePoints = pointsRequired ?? points ?? null;
  const discountNumber = typeof discount === "string" ? parseInt(discount, 10) : discount;
  const hasDiscount = typeof discountNumber === "number" && !Number.isNaN(discountNumber) && discountNumber > 0;
  const discountedPrice = hasDiscount && typeof price === "number" ? Math.round(price * (1 - discountNumber / 100)) : null;

  // Format price as "Rs X,XX,XXX"
  const formatPrice = (priceValue) => {
    if (!priceValue) return "Rs 0";
    return `Rs ${priceValue.toLocaleString("en-IN")}`;
  };

  // Format amenities for display
  const formatAmenityName = (key) => {
    return key
      .replace("has", "")
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/^./, str => str.toUpperCase());
  };

  const displayAmenities = [];
  if (amenities) {
    if (amenities.hasPark) displayAmenities.push("Park");
    if (amenities.hasSecurity || amenities.has24_7Security) displayAmenities.push("24/7 Security");
    if (amenities.hasVisitorParking) displayAmenities.push("Visitor Parking");
    if (amenities.hasTerraceGarden) displayAmenities.push("Terrace Garden");
  }

  return (
    <div 
      className="w-full bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col relative"
      style={{ minHeight: '100%' }}
      onClick={() => onSelect && onSelect(property)}
    >
      {/* New Badge */}
      {isNew && (
        <div className="absolute top-0 left-0 bg-gradient-to-r from-[#98CDFF] to-[#E6AFFF] text-[#0b2239] text-xs font-bold px-3 py-1 rounded-br-lg z-10 border border-white/40">
          New
        </div>
      )}

      {/* Image Section */}
      <div className="h-[200px] sm:h-[220px] w-full relative overflow-hidden bg-gray-200">
        <img
          src={mainImage}
          alt={name}
          className="w-full h-full object-cover"
          style={{ 
            minHeight: '200px',
            maxHeight: '220px',
            objectFit: 'cover',
            display: 'block'
          }}
          onError={(e) => {
            console.error("Image failed to load:", mainImage);
            e.target.src = "https://via.placeholder.com/800x600/cccccc/666666?text=Image+Not+Found";
          }}
          loading="lazy"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 mb-1.5 line-clamp-1 leading-tight truncate">
          {name}
        </h3>

        {/* Price */}
        {hasDiscount && discountedPrice ? (
          <p className="text-blue-600 font-bold text-lg mb-1.5">
            {formatPrice(discountedPrice)}
          </p>
        ) : (
          <p className="text-blue-600 font-bold text-lg mb-1.5">
            {formatPrice(price)}
          </p>
        )}

        {/* Location */}
        <p className="text-gray-600 text-xs mb-3">
          {location || subtitle || "Location not specified"}
        </p>

        {/* Amenities Section - Matching Figma Design with Colorful Icons */}
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs text-gray-600 items-center">
          {beds && (
            <span className="flex items-center gap-1.5">
              <FaBed className="text-blue-500" style={{ fontSize: '14px' }} />
              {beds} Beds
            </span>
          )}
          {baths && (
            <span className="flex items-center gap-1.5">
              <FaBath className="text-cyan-500" style={{ fontSize: '14px' }} />
              {baths} Baths
            </span>
          )}
          {sqFt && (
            <span className="flex items-center gap-1.5">
              <FaRulerCombined className="text-purple-500" style={{ fontSize: '14px' }} />
              {sqFt}
            </span>
          )}
          {displayAmenities.includes("Park") && (
            <span className="flex items-center gap-1.5">
              <FaTree className="text-green-500" style={{ fontSize: '14px' }} />
              Park
            </span>
          )}
          {displayAmenities.includes("24/7 Security") && (
            <span className="flex items-center gap-1.5">
              <FaShieldAlt className="text-orange-500" style={{ fontSize: '14px' }} />
              24/7 Security
            </span>
          )}
          {displayAmenities.includes("Visitor Parking") && (
            <span className="flex items-center gap-1.5">
              <FaParking className="text-indigo-500" style={{ fontSize: '14px' }} />
              Visitor Parking
            </span>
          )}
          {displayAmenities.includes("Terrace Garden") && (
            <span className="flex items-center gap-1.5">
              <FaSeedling className="text-emerald-500" style={{ fontSize: '14px' }} />
              Terrace Garden
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const NewProperties = () => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [detailImageIndex, setDetailImageIndex] = useState(0);
  const [locations, setLocations] = useState([]);
  const [locationSearch, setLocationSearch] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  // locations are fetched independently; no state filter

  const fetchProperties = async () => {
    try {
      const response = await axios.get("/api/v1/properties");
      if (Array.isArray(response.data)) {
        setProperties(response.data);
      } else {
        setProperties([]);
      }
      // Attempt to fetch locations from API in parallel
      fetchLocations();
    } catch (error) {
      console.error("Error fetching properties:", error);
      // On error, clear properties; UI will show "No properties found" message
      setProperties([]);
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await axios.get("/api/v1/properties/locations");
      if (Array.isArray(res.data)) {
        setLocations(res.data.filter(Boolean));
        return;
      }
    } catch (e) {
      // Try external API for Indian cities (no auth): countriesnow
      try {
        const ext = await axios.post("https://countriesnow.space/api/v0.1/countries/cities", { country: "India" });
        const cities = Array.isArray(ext?.data?.data) ? ext.data.data : [];
        if (cities.length > 0) {
          const unique = Array.from(new Set(cities)).slice(0, 500);
          setLocations(unique);
          return;
        }
      } catch (extErr) {
        // ignore and fallback below
      }
      // Final fallback: derive unique locations from current properties
      const unique = Array.from(new Set((properties || []).map((p) => p.location).filter(Boolean)));
      setLocations(unique);
    }
  };

  const filteredProperties = properties.filter((property) => {
    const searchLower = (search || "").toLowerCase();
    const nameStr = (property.name || "").toLowerCase();
    const locationStr = (property.location || "").toLowerCase();
    const builderStr = (property.builder || "").toLowerCase();

    const matchesSearch = searchLower
      ? [nameStr, locationStr, builderStr].some((v) => v.includes(searchLower))
      : true;

    const typedLocation = (locationSearch || "").toLowerCase();
    const matchesLocation = location
      ? property.location === location
      : (typedLocation.length > 1 ? locationStr.includes(typedLocation) : true);

    const price = Number(property.price) || 0;
    let matchesPrice = true;
    switch (priceRange) {
      case "upto-50L":
        matchesPrice = price <= 50_00_000; // 50L
        break;
      case "50L-1.5Cr":
        matchesPrice = price > 50_00_000 && price <= 1_50_00_000; // 50L–1.5Cr
        break;
      case "1.5Cr-3Cr":
        matchesPrice = price > 1_50_00_000 && price <= 3_00_00_000; // 1.5Cr–3Cr
        break;
      case "3Cr-5Cr":
        matchesPrice = price > 3_00_00_000 && price <= 5_00_00_000; // 3Cr–5Cr
        break;
      case "above-5Cr":
        matchesPrice = price > 5_00_00_000; // above 5Cr
        break;
      default:
        matchesPrice = true;
    }

    return matchesSearch && matchesLocation && matchesPrice;
  });

  // Detail View
  if (selectedProperty) {
    const {
      images = [],
      name,
      price,
      location,
      discount,
      description,
      features,
      builder,
      contact,
      pointsRequired,
      points,
      subtitle,
      beds,
      baths,
      sqFt,
      isNew,
    } = selectedProperty;

    const imgSources = (images && images.length > 0)
      ? images.map((img) => (typeof img === "object" && img?.url ? img.url : `data:image/jpeg;base64,${img}`))
      : ["/placeholder.png"];
    const currentImg = imgSources[detailImageIndex] ?? "/placeholder.png";
    const discountNumber = typeof discount === "string" ? parseInt(discount, 10) : discount;
    const hasDiscount = typeof discountNumber === "number" && !Number.isNaN(discountNumber) && discountNumber > 0;
    const discountedPrice = hasDiscount && typeof price === "number" ? Math.round(price * (1 - discountNumber / 100)) : null;
    const effectivePoints = pointsRequired ?? points ?? null;

    return (
      <Container maxWidth="xl" disableGutters sx={{ backgroundColor: "#F0F5F9" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            type="button"
            onClick={() => { setSelectedProperty(null); setDetailImageIndex(0); }}
            className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 text-[#0b2239] bg-gradient-to-r from-[#98CDFF] to-[#E6AFFF] shadow"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back
          </button>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-[260px] sm:h-[360px] md:h-full">
                <img src={currentImg} alt={name} className="w-full h-full object-cover" />
                {imgSources.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      className="absolute inset-y-0 left-4 my-auto h-10 w-10 rounded-full flex items-center justify-center bg-white/85 backdrop-blur-sm shadow border border-white/60 hover:bg-white"
                      onClick={() => setDetailImageIndex((prev) => (prev - 1 + imgSources.length) % imgSources.length)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-700">
                        <path fillRule="evenodd" d="M15.53 19.53a.75.75 0 01-1.06 0l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 111.06 1.06L10.06 12l5.47 5.47a.75.75 0 010 1.06z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      aria-label="Next image"
                      className="absolute inset-y-0 right-4 my-auto h-10 w-10 rounded-full flex items-center justify-center bg-white/85 backdrop-blur-sm shadow border border-white/60 hover:bg-white"
                      onClick={() => setDetailImageIndex((prev) => (prev + 1) % imgSources.length)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-700">
                        <path fillRule="evenodd" d="M8.47 4.47a.75.75 0 011.06 0l6 6a.75.75 0 010 1.06l-6 6a.75.75 0 11-1.06-1.06L13.94 12 8.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
                {subtitle ? (
                  <p className="text-gray-700 mt-1">{subtitle}</p>
                ) : (
                  <p className="text-gray-500 mt-1">{location}</p>
                )}

                {hasDiscount && discountedPrice ? (
                  <div className="mt-3 flex items-center gap-3 flex-wrap">
                    <span className="text-gray-500 line-through">₹{price?.toLocaleString("en-IN")}</span>
                    <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#98CDFF] to-[#E6AFFF] drop-shadow">₹{discountedPrice.toLocaleString("en-IN")}</span>
                    <span className="text-xs font-bold text-[#0b2239] bg-gradient-to-r from-[#98CDFF] to-[#E6AFFF] px-2 py-1 rounded-full border border-white/40">{discountNumber}% OFF</span>
                  </div>
                ) : (
                  <p className="mt-3 text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#98CDFF] to-[#E6AFFF] drop-shadow">₹{price?.toLocaleString("en-IN")}</p>
                )}

                {(beds || baths || sqFt) && (
                  <div className="mt-3 text-gray-600">
                    <span className="mr-4">Beds: {beds ?? '-'}</span>
                    <span className="mr-4">Baths: {baths ?? '-'}</span>
                    <span>SqFt: {sqFt ?? '-'}</span>
                  </div>
                )}

                <div className="mt-4 text-gray-800">
                  <div><span className="font-semibold">Builder:</span> {builder || 'NA'}</div>
                  <div className="mt-1"><span className="font-semibold">Contact:</span> {contact || '-'}</div>
                </div>

                {description && (
                  <div className="mt-4 text-gray-800">
                    <span className="font-semibold">Description:</span>
                    <p className="mt-1">{description}</p>
                  </div>
                )}

                {Array.isArray(features) && features.length > 0 && (
                  <div className="mt-3 text-gray-800">
                    <span className="font-semibold">Features:</span> {features.join(', ')}
                  </div>
                )}

                {(pointsRequired != null || points != null) && (
                  <div className="mt-3 text-gray-900">
                    <span className="font-semibold">Points Required:</span> {pointsRequired ?? points}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" disableGutters sx={{ backgroundColor: "#F0F5F9" }}>
      {/* Hero Section */}
      <section className="relative flex w-full h-[360px] sm:h-[450px] md:h-[550px]">
        <div className="absolute top-0 left-0 w-[40%] h-full bg-purple-700 opacity-90 hidden sm:block"></div>
        <div className="relative flex-1 h-full ml-0 sm:ml-[40%]">
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${heroImg})`,
              clipPath: "polygon(0 0, 100% 0, 100% 80%, 85% 100%, 0 100%)",
              borderBottomRightRadius: "80px",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
        </div>
        <div className="absolute z-10 top-[110px] sm:top-[120px] left-4 sm:left-[8%] w-[92%] sm:w-[70%] max-w-3xl flex flex-col space-y-3 sm:space-y-4 text-white">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold leading-tight font-montserrat drop-shadow">
            Every property here brings you closer to your dream home
          </h1>
          <p className="text-xs sm:text-lg font-montserrat">
            Because your home deserves more than just a listing
          </p>
          <div className="flex flex-col sm:flex-row items-center w-full gap-2 bg-[#D9D9D9] rounded-xl overflow-hidden shadow-md p-2">
            <FormControl className="flex-1">
              <Select
                value=""
                displayEmpty
                sx={{
                  backgroundColor: "transparent",
                  border: "none",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                inputProps={{ "aria-label": "Property type" }}
              >
                <MenuItem value="">Available Properties</MenuItem>
                <MenuItem value="houses">Houses</MenuItem>
                <MenuItem value="apartments">Apartments</MenuItem>
              </Select>
            </FormControl>

            <div className="hidden sm:block w-px h-8 bg-gray-400 mx-2"></div>

            <div className="flex items-center flex-1 px-3 py-2 rounded-lg bg-transparent">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search properties or keywords"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 outline-none text-gray-700 bg-transparent placeholder-gray-600"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#F0F5F9]">

         {/* Properties for Sale Section */}
         <div className="flex flex-col items-center text-center mt-8 sm:mt-12 px-4">
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontStyle: "normal",
              fontSize: "clamp(28px, 6vw, 54px)",
              lineHeight: "100%",
              letterSpacing: "0em",
              textAlign: "center",
              color: "#000000",
              opacity: 1
            }}
          >
            Properties for Sale
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mt-3 sm:mt-4">
            Step into a home that celebrates how far you’ve come
          </p>
        </div>
        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-8 sm:my-12 px-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 40 24"
              strokeWidth={2.5}
              stroke="#2C4285"
              className="w-16 h-14 sm:w-24 sm:h-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2 12h28M25 6l10 6-10 6"
              />
            </svg>

            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "22px",
                lineHeight: "100%",
                letterSpacing: "0.02em",
                textAlign: "center",
              }}
            >
              Our Property
            </span>
          </div>

          <div className="bg-[#F0F0F0] rounded-2xl p-3 sm:p-4 shadow-lg w-full max-w-5xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <TextField
                label="Search Properties"
                variant="outlined"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="medium"
                InputProps={{
                  style: { backgroundColor: "#D9D9D9" },
                }}
              />
              <Autocomplete
                disablePortal
                options={["", ...locations]}
                value={location}
                onChange={(e, newValue) => setLocation(newValue || "")}
                inputValue={locationSearch}
                onInputChange={(e, newInput) => setLocationSearch(newInput)}
                renderInput={(params) => (
                  <TextField {...params} label="Location" variant="outlined" InputProps={{ ...params.InputProps, style: { backgroundColor: "#D9D9D9" } }} />
                )}
                fullWidth
              />
              <FormControl fullWidth size="medium">
                <InputLabel>Price Range</InputLabel>
                <Select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  label="Price Range"
                  style={{ backgroundColor: "#D9D9D9" }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="upto-50L">Up to 50L</MenuItem>
                  <MenuItem value="50L-1.5Cr">50L – 1.5Cr</MenuItem>
                  <MenuItem value="1.5Cr-3Cr">1.5Cr – 3Cr</MenuItem>
                  <MenuItem value="3Cr-5Cr">3Cr – 5Cr</MenuItem>
                  <MenuItem value="above-5Cr">Above 5Cr</MenuItem>
                </Select>
              </FormControl>
              <div className="flex items-center px-3 py-2 rounded-lg bg-white/40">
                <FaSearch className="text-gray-500 mr-2" />
                <input type="text" placeholder="Search keywords" className="flex-1 outline-none text-gray-700 bg-transparent placeholder-gray-600" />
              </div>
            </div>
          </div>
        </div>

               {/* Section Heading */}
           <h2
  className="text-center font-montserrat font-semibold"
  style={{
    fontSize: "clamp(24px, 6vw, 48px)", // 24px on mobile, 48px max, scales with viewport
    lineHeight: "1.2",
    letterSpacing: "0.01em",
    color: "#000000",
  }}
>
  Find the space that defines your next chapter
</h2>


        {/* Properties Grid */}
        <div className="bg-[#F0F5F9] min-h-screen py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            {filteredProperties.length > 0 ? (
              <Grid container spacing={4} alignItems="stretch">
                {filteredProperties.map((property) => (
                  <Grid item key={property.id} xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex' }}>
                    <div style={{ width: '100%' }}>
                      <PropertyCard property={property} onSelect={setSelectedProperty} />
                    </div>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No properties found. Please check your API connection or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NewProperties;
