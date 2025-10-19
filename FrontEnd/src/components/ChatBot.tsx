"use client";

import { useState, useEffect, useRef } from "react";
import localFont from "next/font/local";
import { motion, AnimatePresence } from "framer-motion";

const PoppinsBold = localFont({
  src: "../fonts/Poppins-Bold.ttf",
});

const PoppinsRegular = localFont({
  src: "../fonts/Poppins-Regular.ttf",
});

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [botTyping, setBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, botTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chatbot/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      // Delay biar efek typing tetap muncul
      setTimeout(() => {
        setLoading(false);
        setBotTyping(true);

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { role: "bot", content: data.reply || "Maaf, tidak ada respon." },
          ]);
          setBotTyping(false);
        }, 1500);
      }, 500);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Terjadi kesalahan koneksi ke server 😢" },
      ]);
      setLoading(false);
      setBotTyping(false);
    }
  };

  return (
    <div>
      {/* Icon pojok kanan bawah */}
      <div className="fixed bottom-7 right-7 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="relative w-16 h-16 rounded-full bg-[#0E5E66] text-white shadow-lg shadow-black/50 
               flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl hover:bg-[#0a484e] hover:bg-opacity-90"
        >
          {/* Chat bubble */}
          <div
            className={`absolute -top-9 right-1/2 transform translate-x-1/2 bg-[#0E5E66] text-white text-sm px-3 py-1 rounded-full shadow-md animate-bounce ${PoppinsRegular.className}`}
          >
            Hi!!
          </div>

          {/* Lingkaran hijau */}
          <span className="absolute top-3.5 right-3 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping transition-all duration-700 ease-in-out"></span>
          <span className="absolute top-3.5 right-3 w-2.5 h-2.5 bg-green-500 rounded-full transition-all duration-700 ease-in-out"></span>

          {/* Robot Icon */}
          <img
            src="/images/robot.png"
            alt="Chat Icon"
            className="w-8 h-8 relative z-10"
          />
        </button>
      </div>

      {/* Chat Window dengan AnimatePresence */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-7 right-5 w-96 h-120 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.4)] flex flex-col z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-transparent text-white rounded-t-2xl border-zinc-800 mt-1 mb-1">
              <div className="relative flex gap-2 items-center">
                {/* Icon Robot */}
                <div className="relative">
                  <img
                    src="/images/robot.png"
                    alt="Chat Icon"
                    className="w-7 h-7 relative z-10"
                  />

                  {/* Ping animasi */}
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full animate-ping transition-all duration-700 ease-in-out"></span>
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full transition-all duration-700 ease-in-out"></span>
                </div>

                {/* Nama bot */}
                <span
                  className={`${PoppinsRegular.className} font-medium text-[16px] text-white`}
                >
                  Salbot
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white text-lg hover:font-bold hover:scale-110 transition-transform duration-100 mr-2"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div
              className={`flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900 ${PoppinsRegular.className} `}
            >
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      x: m.role === "user" ? 60 : -60,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: 0,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      y: 10,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl max-w-[75%] break-words text-[15px] shadow-md ${
                        m.role === "user"
                          ? "bg-gradient-to-br from-[#0E5E66] to-[#118A9E] text-white rounded-br-none shadow-[#0E5E66]/40"
                          : "bg-gradient-to-br from-zinc-700 to-zinc-800 text-white rounded-bl-none shadow-zinc-800/40"
                      }`}
                    >
                      {m.content}
                    </div>
                  </motion.div>
                ))}

                {/* Bot typing animasi */}
                {botTyping && (
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="flex justify-start"
                  >
                    <div className="px-3 py-1.5 rounded-2xl max-w-[50%] bg-zinc-700 text-white self-start flex justify-center rounded-bl-none">
                      {[0, 0.2, 0.4].map((d, idx) => (
                        <motion.div
                          key={idx}
                          className="w-2 h-2 rounded-full bg-white mx-0.5"
                          animate={{ y: [0, -4, 0], opacity: [1, 0.5, 1] }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.6,
                            delay: d,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-3 flex gap-2 border-zinc-800 backdrop-blur-md bg-zinc-900/60 sticky bottom-0">
              <motion.input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                whileFocus={{
                  scale: 1.02,
                  boxShadow: "0 0 8px rgba(56,189,248,0.4)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className={`flex-1 bg-zinc-800 text-gray-200 placeholder:text-gray-400 placeholder:text-sm border border-zinc-700 rounded-lg px-3 py-1.5 focus:outline-none ${PoppinsRegular.className}`}
                placeholder="Type your message..."
              />
              <motion.button
                onClick={sendMessage}
                whileTap={{ scale: 0.85, rotate: 15, y: -5 }}
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="p-2 rounded-lg bg-gradient-to-br from-[#0E5E66] to-[#118A9E] hover:shadow-[0_0_12px_#118A9E80] transition-all"
              >
                <motion.img
                  src="/images/airplane.png"
                  alt="Send"
                  className="w-5 h-5"
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    ease: "easeInOut",
                  }}
                />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
