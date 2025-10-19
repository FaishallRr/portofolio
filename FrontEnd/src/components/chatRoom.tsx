"use client";

import { useState, useEffect } from "react";
import { auth, loginWithGoogle, logout, db } from "../firebase/firebase-client";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import localFont from "next/font/local";

import { motion } from "framer-motion";

const PoppinsBold = localFont({
  src: "../fonts/Poppins-Bold.ttf",
});

const PoppinsRegular = localFont({
  src: "../fonts/Poppins-Regular.ttf",
});

// Interface Chatroom
export interface Chatroom {
  id: string;
  name: string;
  members: string[];
  uid?: string; // optional uid pemilik chatroom
  text?: string; // optional pesan
  displayName?: string; // optional nama user
  createdAt?: any;
}

export default function ChatRoom() {
  const [user, setUser] = useState<User | null>(null);
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);

  // Cek login
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Ambil chatrooms dari Firestore
  const fetchChatrooms = async () => {
    try {
      const q = query(collection(db, "chatrooms"), orderBy("createdAt"));
      const snapshot = await getDocs(q);
      const rooms: Chatroom[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Chatroom;
        return {
          ...data,
          id: doc.id, // pastikan id dari Firestore dipakai terakhir
        };
      });

      setChatrooms(rooms);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatrooms();
  }, []);

  // Buat chatroom baru
  const handleCreateRoom = async () => {
    if (!roomName.trim() || !user) return;

    try {
      const newRoomRef = await addDoc(collection(db, "chatrooms"), {
        name: roomName,
        members: [user.displayName ?? user.email ?? "Anonymous"],
        uid: user.uid,
        createdAt: serverTimestamp(),
      });

      const newRoom: Chatroom = {
        id: newRoomRef.id,
        name: roomName,
        members: [user.displayName ?? user.email ?? "Anonymous"],
        uid: user.uid,
      };

      setChatrooms((prev) => [newRoom, ...prev]);
      setRoomName("");
    } catch (err) {
      console.error("Gagal buat chatroom:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen p-5 mt-[120px]">
      <div className="bg-zinc-800 p-6 rounded-2xl shadow-xl max-w-2xl flex flex-col w-[80%]">
        <div className="bg-zinc-900 p-6 rounded-2xl shadow-xl w-full max-w-2xl flex flex-col h-[70vh] border border-[#0E5E66]">
          <h2
            className={`text-2xl font-bold text-center mb-3 text-white ${PoppinsBold.className}`}
          >
            💬 Chatrooms
          </h2>

          {/* Header login/logout */}
          <div className="flex justify-between items-center mb-5">
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/40"}
                    alt="avatar"
                    className="w-12 h-12 rounded-full border-2 border-blue-500"
                  />
                  <span
                    className={`font-semibold text-white ${PoppinsRegular.className}`}
                  >
                    {user.displayName}
                  </span>
                </div>
                <button
                  onClick={() => logout()}
                  className={`bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition ${PoppinsRegular.className}`}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={loginWithGoogle}
                className={`flex items-center gap-3 bg-white text-zinc-900 text-[15px] px-4 py-2 rounded-full hover:bg-gray-300 transition mt-1 mb-1 ml-2 ${PoppinsRegular.className}`}
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google Logo"
                  className="w-6 h-6"
                />
                Login with Google
              </button>
            )}
          </div>

          {/* Area chatrooms */}
          <div className="flex-1 overflow-y-auto mb-4 flex flex-col-reverse p-2 space-y-3 space-y-reverse scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {chatrooms.map((room) => {
              const isUser = user?.uid && room.uid === user.uid;

              return (
                <div
                  key={room.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`p-3 rounded-xl w-full max-w-sm transition
                    ${
                      isUser
                        ? "bg-gradient-to-br from-[#0E5E66] to-[#118A9E] text-white rounded-br-none shadow-[#0E5E66]/40"
                        : "bg-gradient-to-br from-zinc-700 to-zinc-800 text-white rounded-bl-none shadow-zinc-800/40"
                    }`}
                  >
                    <div
                      className={`text-sm opacity-70 mb-1 ${PoppinsRegular.className}`}
                    >
                      {room.displayName || room.members?.[0]}
                    </div>
                    <div className={`text-xm ${PoppinsRegular.className}`}>
                      {room.text || room.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input untuk chatroom baru */}
          {user && (
            <div className="flex gap-2">
              <motion.input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleCreateRoom();
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
                onClick={handleCreateRoom}
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
          )}
        </div>
      </div>
    </div>
  );
}
