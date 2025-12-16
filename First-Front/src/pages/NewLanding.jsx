import propertyWomanImage from "../assets/Landing/property-woman.jpg";
import propertyImage from "../assets/Landing/Home.jpg";
import { features, testimonials } from "../constants/data";
function Landing() {
    return (
        <div>

            <div className="bg-gray-100 flex flex-col">

                <div className="w-full">
                    <img
                        src={propertyImage}
                        alt="Modern Property"
                        className="w-full max-h-[400px] object-cover"
                        loading="lazy"
                    />
                </div>

                {/* Hero Content */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-10 py-12 px-6 md:px-20">

                    {/* Left: Image (moved here) */}
                    <div className="w-full md:w-1/2 flex justify-center order-1 md:order-1">
                        <img
                            src={propertyWomanImage}
                            alt="Woman scanning bills"
                            className="rounded-xl w-full max-w-md object-cover shadow-md"
                        />
                    </div>

                    {/* Right: Text Content (moved here) */}
                    <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-2">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-snug">
                            Turn Everyday Bills into Property Credit
                        </h1>
                        <p className="text-gray-600 text-lg mb-6">
                            Scan, earn points, and redeem towards your first home.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition" style={{ borderRadius: '6px' }}>
                                How it Works
                            </button>
                            <button className="bg-white border border-gray-300 px-6 py-2 rounded-full hover:bg-gray-200 transition" style={{ borderRadius: '6px' }}>
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <section className="bg-[#050d0f] py-16 px-4 sm:px-6 lg:px-8 text-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-center text-3xl sm:text-4xl font-semibold mb-12">FEATURES</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="bg-gradient-to-b from-indigo-500 to-purple-700 rounded-2xl p-6 shadow-xl space-y-4 hover:scale-105 transition-transform duration-300"
                            >
                                <div className="text-white">{feature.icon}</div>
                                <h3 className="text-xl font-semibold">{feature.title}</h3>
                                <p className="text-sm text-white/90">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">

                    {/* Left Side */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl sm:text-4xl font-semibold mb-2">Discover Properties</h2>
                        <p className="text-gray-600 mb-6 text-base sm:text-lg">
                            Browse properties, check discounts, and find your dream home.
                        </p>

                        {/* Property Listings Card */}
                        <div className="mb-4">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white rounded-xl px-6 py-4 w-full max-w-sm mx-auto md:mx-0 shadow-md">
                                <h3 className="text-lg font-semibold">Property Listings</h3>
                                <p className="text-sm text-white/90">
                                    View property details like price, location, and builder information.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white rounded-xl px-6 py-4 w-full max-w-sm mx-auto md:mx-0 shadow-md">
                                <h3 className="text-lg font-semibold">Property Discount</h3>
                                <p className="text-sm text-white/90">
                                    Use reward points to unlock exclusive discounts on properties.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side (Image) */}
                    <div className="flex-1 w-full">
                        <img
                            src={propertyImage}
                            alt="Buildings"
                            className="rounded-2xl shadow-xl w-full h-64 sm:h-80 md:h-full object-cover"
                        />
                    </div>
                </div>
            </section>
            <section className="bg-gradient-to-b from-[#5C4DFF] to-[#263B96] py-16 px-4 text-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Customer Testimonials</h2>
                    <p className="text-lg mb-12 max-w-xl mx-auto">
                        We turn everyday bills into property savings — here’s proof.
                    </p>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> 
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                className="bg-[#6C5CE7] bg-opacity-30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="flex gap-1 mb-4 justify-center">
                                    {[...Array(t.stars)].map((_, i) => (
                                        <span key={i} className="text-yellow-400 text-xl">★</span>
                                    ))}
                                </div>
                                <p className="mb-6 text-sm italic">"{t.text}"</p>
                                <div className="flex items-center gap-4 justify-center">
                                    <img
                                        src={t.img}
                                        alt={t.name}
                                        className="w-12 h-12 rounded-full border-2 border-white object-cover"
                                    />
                                    <div className="text-left">
                                        <p className="font-semibold">{t.name}</p>
                                        <p className="text-sm opacity-80">{t.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Landing
