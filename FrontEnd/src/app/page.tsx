"use client";

import { Globe } from "@/components/ui/globe";
import { useState, useEffect } from "react";
import Aurora from "@/components/Aurora/Aurora";
import PreLoader from "../components/PreLoader";
import Navbar from "@/components/Navbar";
import ClickSpark from "@/components/ClickSpark/ClickSpark";
import AOS from "aos";
import "aos/dist/aos.css";
import AnimatedBeamDemo from "@/components/AnimatedBeamDemo";
import DockDemo from "@/components/DockDemo";
import AboutComponents from "@/components/AboutComponents";
import MyeducationComponents from "@/components/MyeducationComponents";
import MyorganizationComponents from "@/components/MyorganizationComponents";
import ChatRoom from "@/components/chatRoom";

export default function Home() {
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
      <div className="w-full min-h-screen bg-zinc-900 overflow-hidden">
        <PreLoader />
        <div className="absolute inset-0 z-0">
          <Aurora
            colorStops={["#577870", "#1F97A6", "#128C99"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>

        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <Navbar />
          <AboutComponents />
          <MyeducationComponents />
          <MyorganizationComponents />
          <AnimatedBeamDemo />
          <DockDemo />
          <ChatRoom />
        </ClickSpark>
      </div>
    </>
  );
  return <Globe />;
}
