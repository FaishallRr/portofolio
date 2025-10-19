"use client";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import Lanyard from "@/components/Lanyard/Lanyard";
import { motion } from "framer-motion";
import localFont from "next/font/local";
import ShinyText from "@/components/ShinyText/ShinyText";
import BlurText from "@/components/BlurText/BlurText";
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

const AboutComponents = () => {
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

  return (
    <>
      <div className="flex flex-col md:flex-row relative z-10 justify-center items-center md:mt-[75px] gap-10 md:gap-[250px] px-5 md:px-0 text-center md:text-left">
        <motion.div
          className="flex flex-col gap-6 w-full md:w-[37%]"
          initial={{ opacity: 0, y: 250 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 3.5, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 bg-zinc-800 w-fit mx-auto md:mx-0 p-4 rounded-2xl">
            <img
              src="/images/me.png"
              className="w-10 rounded-md"
              alt="imageProfile"
            />
            <q className={`text-white ${PoppinsRegular.className}`}>
              Fear is temporary, regret is forever.
            </q>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <ShinyText
              text="Hi I'm Faishal Rasyid Rusianto"
              disabled={false}
              speed={3}
              className={`custom-class ${PoppinsBold.className}`}
            />
          </h1>

          {showBlurText && (
            <BlurText
              text="A web and app developer who loves building cool, fast, and modern digital stuff — focused on making things look good and work even better."
              delay={150}
              animateBy="words"
              direction="top"
              className={`md:text-[16px] mb-5 text-white mt-[-30px] ${PoppinsRegular.className}`}
              onAnimationComplete={handleAnimationComplete}
            />
          )}

          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-4 mt-[-10px]">
            <a
              href="#"
              download=""
              className={`sm:text-xm font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors ${PoppinsRegular.className}`}
            >
              <ShinyText text="Download CV" disabled={false} speed={3} />
            </a>

            <a
              href="#project"
              className={`sm:text-xm font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors ${PoppinsRegular.className}`}
            >
              <ShinyText
                text="Explore My Projects"
                disabled={false}
                speed={3}
              />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-auto mt-10 md:mt-0 flex justify-center"
          initial={{ opacity: 0, y: 250 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 4.5, ease: "easeOut" }}
        >
          <ProfileCard
            name="Faishal Rasyid R"
            title="Web Developer"
            handle="_faishallrr"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/images/me.png"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() =>
              window.open("https://wa.me/62895703047094", "_blank")
            }
            className={`${PoppinsRegular.className}`}
          />
        </motion.div>
      </div>
      <div
        className="mt-[150px] mx-auto w-[80%] max-w-[1600px] rounded-3xl border-[4px] border-[#0E5E66] shadow-[0_0_40px_rgba(31,151,166,0.2),_0_0_80px_rgba(18,140,153,0.2)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] p-6"
        id="about"
      >
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-10 pt-0 px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          <div className="basis-full md:basis-7/12 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-[#1F97A6]">
            {/* Kolom kiri */}
            <div className="flex-1 text-left">
              <h2
                className={`text-3xl md:text-4xl font-bold text-white mb-5 ${PoppinsBold.className}`}
              >
                About Me
              </h2>

              <BlurText
                text="I’m Faishal Rasyid Rusianto — a developer from the Informatics Engineering program at Dian Nuswantoro University. I love working on research-based tech projects, especially in Android and Web development. I also have experience in data processing using Microsoft Office tools. Right now, I’m looking for new opportunities to learn, grow, and make an impact in the tech world through innovation."
                delay={150}
                animateBy="words"
                direction="top"
                className={`text-base md:text-[17px] leading-relaxed mb-10 text-gray-300 ${PoppinsRegular.className}`}
                onAnimationComplete={handleAnimationComplete}
              />

              <div
                className={`flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-y-8 sm:gap-y-0 mb-4 w-full text-white ${PoppinsRegular.className}`}
              >
                <div>
                  <h1 className="text-3xl md:text-[29px] mb-1">
                    20<span className="text-[#1F97A6]">+</span>
                  </h1>
                  <p>Project Finished</p>
                </div>
                <div>
                  <h1 className="text-3xl md:text-[29px] mb-1">
                    1<span className="text-[#1F97A6]">+</span>
                  </h1>
                  <p>Years of Experience</p>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="600"
                  data-aos-once="true"
                >
                  <h1 className="text-3xl md:text-[29px] mb-1">
                    3.81<span className="text-[#1F97A6]">/4.00</span>
                  </h1>
                  <p>GPA</p>
                </div>
              </div>

              <ShinyText
                text="Working with heart, creating with mind."
                disabled={false}
                speed={3}
                className={`text-sm md:text-base text-violet-400 ${PoppinsRegular.className}`}
              />
            </div>
            {/* Kolom kanan */}
          </div>
          <div className="basis-full md:basis-5/12 pl-0 md:pl-8 overflow-hidden max-w-full flex justify-center ">
            <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutComponents;
