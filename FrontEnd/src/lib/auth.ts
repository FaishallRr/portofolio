// src/lib/auth.ts
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-client";

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user; // penting! return user biar bisa di-setState
  } catch (error) {
    console.error("Google login error:", error);
    return null;
  }
};

export const logout = async () => {
  await signOut(auth);
};
