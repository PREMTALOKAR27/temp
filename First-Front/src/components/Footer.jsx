const Footer = () => {
  return (
    <footer className="bg-[#60259C] text-white text-sm py-6 px-4 border-t border-transparent">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">

        {/* Links */}
        <div className="flex flex-wrap justify-center sm:justify-center md:justify-start gap-4 md:gap-6">
          <a href="/privacy-policy" className="text-white hover:underline">Privacy Policy</a>
          <a href="/terms-of-use" className="text-white hover:underline">Terms of Use</a>
          <a href="/cookie-policy" className="text-white hover:underline">Cookie Settings</a>
          <a href="/disclaimer" className="text-white hover:underline">Disclaimer</a>
        </div>

        {/* Email & Rights */}
        <div className="text-center md:text-right max-w-full sm:max-w-lg md:max-w-md break-words">
          © 2025 First-Buy. All rights reserved. Owned and operated by Aurevo28 Proptech Pvt. Ltd.
          <br className="sm:block md:hidden"/>
          Email:{" "}
          <a
            href="mailto:first.buyrewards@gmail.com"
            className="text-white hover:underline break-words"
          >
            first.buyrewards@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
