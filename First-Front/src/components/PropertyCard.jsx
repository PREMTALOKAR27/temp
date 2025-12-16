
const PropertyCard = ({ image, title, price, location }) => {
  return (
    <div className="w-[350px] rounded-xl shadow-lg overflow-hidden bg-white cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <div className="h-[240px] w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2 flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-blue-600 font-bold text-xl">{price}</p>
        <p className="text-gray-600">{location}</p>
      </div>
    </div>
  );
};

export default PropertyCard;