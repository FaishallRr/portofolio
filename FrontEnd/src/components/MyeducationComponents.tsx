"use client";
import localFont from "next/font/local";
import BlurText from "@/components/BlurText/BlurText";
import ShinyText from "@/components/ShinyText/ShinyText";
import { useState, useEffect } from "react";
import SpotlightCard from "@/components/SpotlightCard/SpotlightCard";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

const PoppinsBold = localFont({
  src: "../fonts/Poppins-Bold.ttf",
});

const PoppinsRegular = localFont({
  src: "../fonts/Poppins-Regular.ttf",
});

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

const MyeducationComponents = () => {
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
          My Education
        </h1>
        <p
          className={`text-base/loose  opacity-50 text-white ${PoppinsRegular.className}`}
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="300"
          data-aos-once="true"
        >
          Formal education and specialized training that shaped my technical
          expertise.
        </p>
        <div className="w-full flex justify-center items-center mt-15">
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(31,151,166,0.7)"
          >
            <div
              className={`relative md:w-[70%] lg:w-[100%] p-6 rounded-xl border border-zinc-700 transition-all duration-300 bg-zinc-900 hover:border-[#1F97A6] hover:shadow-[0_0_25px_rgba(31,151,166,0.7)]
`}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {/* Icon topi dengan lingkaran */}
              <div
                className={`absolute top-[-17px] right-[-17px] w-18 h-18 rounded-full bg-[#135D66] flex items-center justify-center transition-transform duration-300 ${
                  hover ? "rotate-40" : "rotate-0"
                }`}
              >
                <Image
                  src="/images/graduation.png"
                  alt="Graduation Cap"
                  width={28}
                  height={28}
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
                  Computer Technology
                </p>
                <p
                  className={`text-base/loose text-[#77B0AA] ${PoppinsBold.className}`}
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-once="true"
                >
                  Universitas Dian Nuswantoro
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
                    text=" I specialize in IoT, Computer Networking, Web Development, and
                      Cloud Computing, and am currently deepening my knowledge in
                      Artificial Intelligence."
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
                KEY COURSESES
              </p>
              <div
                className="flex gap-2 flex-wrap mt-2"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-once="true"
              >
                <div
                  className={`font-semibold bg-[#1a1a1a] px-3 py-1.5 rounded-full border border-gray-700 hover:bg-[#222] transition-colors ${PoppinsRegular.className}`}
                >
                  <ShinyText
                    text="Internet of Things"
                    disabled={false}
                    speed={3}
                    className={`text-xs sm:text-sm text-violet-400 ${PoppinsRegular.className}`}
                  />
                </div>

                <div
                  className={`font-semibold bg-[#1a1a1a] px-3 py-1.5 rounded-full border border-gray-700 hover:bg-[#222] transition-colors ${PoppinsRegular.className}`}
                >
                  <ShinyText
                    text="Web Development"
                    disabled={false}
                    speed={3}
                    className={`text-xs sm:text-sm text-violet-400 ${PoppinsRegular.className}`}
                  />
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </>
  );
};

export default MyeducationComponents;
