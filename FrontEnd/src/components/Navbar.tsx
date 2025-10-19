"use client";

import localFont from "next/font/local";

// Fonts
const PoppinsBold = localFont({
  src: "../fonts/Poppins-Bold.ttf",
});

const PoppinsRegular = localFont({
  src: "../fonts/Poppins-Regular.ttf",
});

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center mt-9 z-[100] relative">
      <div className="text-[30px] font-[800] text-white ml-[80px]">
        <div className={PoppinsBold.className}>Portofolio</div>
      </div>

      <ul className={`flex space-x-10 mr-[80px] ${PoppinsRegular.className} `}>
        {["Home", "About", "Project", "Contact"].map((text) => (
          <li key={text}>
            <a
              href="#"
              className="sm:text-[18px] text-base font-medium text-white"
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
