"use client";

import ShinyText from "@/components/ShinyText/ShinyText";
import BlurText from "@/components/BlurText/BlurText";
import SpotlightCard from "@/components/SpotlightCard/SpotlightCard";
import Image from "next/image";
import localFont from "next/font/local";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PoppinsBold = localFont({
  src: "../fonts/Poppins-Bold.ttf",
});

const PoppinsRegular = localFont({
  src: "../fonts/Poppins-Regular.ttf",
});

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

const MyorganizationComponents = () => {
  const [showBlurText, setShowBlurText] = useState(false);

  // 🕒 Delay munculnya BlurText
  const blurTextDelay = 3500; // dalam milidetik (4 detik)

  useEffect(() => {
    const timer = setTimeout(() => setShowBlurText(true), blurTextDelay);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // durasi animasi 1000ms
  }, []);

  const [hover, setHover] = useState(false);
  return (
    <>
      <div
        className="proyek mt-[50px] py-10"
        id="education"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-once="true"
      ></div>
      <div className="w-[85%] mx-auto">
        <h1
          className={` text-4xl font-bold mb-2 text-white ${PoppinsBold.className}`}
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          My Organizations
        </h1>
        <p
          className={`text-base/loose  opacity-50 text-white ${PoppinsRegular.className}`}
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="300"
          data-aos-once="true"
        >
          Communities and groups where I've contributed and grown
          professionally.
        </p>

        <div className="flex justify-center items-center gap-4">
          <div className="w-[40%] flex justify-center items-center mt-15">
            <SpotlightCard
              className="custom-spotlight-card"
              spotlightColor="rgba(46,142,180,0.7)"
            >
              <div
                className={`relative md:w-[70%] lg:w-[100%] p-6 rounded-xl border border-zinc-700 transition-all duration-300 bg-zinc-900 hover:shadow-[0_0_30px_rgba(46,142,180,0.7)] hover:border-[#1F6E8C]`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                {/* Icon topi dengan lingkaran */}
                <div
                  className={`absolute top-[-17px] right-[-17px] w-18 h-18 rounded-full bg-[#1F6E8C] flex items-center justify-center transition-transform duration-300 ${
                    hover ? "rotate-40" : "rotate-0"
                  }`}
                >
                  <Image
                    src="/images/team.png"
                    alt="Graduation Cap"
                    width={30}
                    height={30}
                    className="object-contain"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <p
                    className={`text-base md:text-[26px] leading-relaxed text-gray-300 ${PoppinsBold.className}`}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-once="true"
                  >
                    HM-TI (Himpunanan Mahasiswa Teknik Informatika)
                  </p>
                  <p
                    className={`text-base/loose text-[#2e8eb4] ${PoppinsBold.className}`}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-once="true"
                  >
                    Bendahara Umum
                  </p>
                  <ShinyText
                    text="2024 - Present"
                    disabled={false}
                    speed={3}
                    className={`custom-class md:text-base/loose ${PoppinsRegular.className}`}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-once="true"
                  />

                  {showBlurText && (
                    <BlurText
                      text=" HM–TI is a student organization as a means of self-development for students towards broadening their horizons, increasing creativity, scholarship, and developing students' knowledge and reasoning."
                      delay={150}
                      animateBy="words"
                      direction="top"
                      className={`text-base/loose mb-4 leading-relaxed text-gray-300 ${PoppinsRegular.className}`}
                      onAnimationComplete={handleAnimationComplete}
                    />
                  )}
                </div>

                <hr className="border-zinc-700 mb-4" />
                <p
                  className={`text-base/loose text-zinc-400 ${PoppinsBold.className}`}
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-once="true"
                >
                  CONTRIBUTIONS
                </p>
                <div
                  className="flex gap-2 flex-wrap mt-2"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-once="true"
                >
                  <p
                    className={`font-semibold bg-[#1a1a1a] px-3 py-1.5 rounded-full border border-gray-700 hover:bg-[#222] transition-colors ${PoppinsRegular.className}`}
                  >
                    <ShinyText
                      text="solidarity"
                      disabled={false}
                      speed={3}
                      className={`text-xs sm:text-sm text-violet-400 ${PoppinsRegular.className}`}
                    />
                  </p>

                  <p
                    className={`font-semibold bg-[#1a1a1a] px-3 py-1.5 rounded-full border border-gray-700 hover:bg-[#222] transition-colors ${PoppinsRegular.className}`}
                  >
                    <ShinyText
                      text="Problem Solving"
                      disabled={false}
                      speed={3}
                      className={`text-xs sm:text-sm text-violet-400 ${PoppinsRegular.className}`}
                    />
                  </p>
                  <p
                    className={`font-semibold bg-[#1a1a1a] px-3 py-1.5 rounded-full border border-gray-700 hover:bg-[#222] transition-colors ${PoppinsRegular.className}`}
                  >
                    <ShinyText
                      text="Teamwork"
                      disabled={false}
                      speed={3}
                      className={`text-xs sm:text-sm text-violet-400 ${PoppinsRegular.className}`}
                    />
                  </p>

                  <p
                    className={`font-semibold bg-[#1a1a1a] px-3 py-1.5 rounded-full border border-gray-700 hover:bg-[#222] transition-colors ${PoppinsRegular.className}`}
                  >
                    <ShinyText
                      text="Collaboration"
                      disabled={false}
                      speed={3}
                      className={`text-xs sm:text-sm text-violet-400 ${PoppinsRegular.className}`}
                    />
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyorganizationComponents;
