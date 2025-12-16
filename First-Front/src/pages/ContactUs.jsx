import React from "react";

const ContactUs = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left Side - Contact Info */}
          <div className="space-y-6 text-white">
            <p className="text-lg font-medium">Contact</p>
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="text-base text-white/80">
              We're here to help with anything you need.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">📧</span>
                <a href="mailto:support@first-buy.com" className="underline">
                  support@first-buy.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">📞</span>
                <a href="tel:+91-XXXX-XXX-XXX" className="underline">
                  +91-XXXX-XXX-XXX
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">📍</span>
                <p>Sample address</p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <form
            className="space-y-6 text-white"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Form submitted!");
            }}
          >
            <div>
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                placeholder="Type your message..."
                required
              ></textarea>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                className="accent-purple-500"
                required
              />
              <label htmlFor="terms" className="text-sm">
                I accept the Terms
              </label>
            </div>

            <button
              type="submit"
              className="px-6 py-2 rounded-full font-medium bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;