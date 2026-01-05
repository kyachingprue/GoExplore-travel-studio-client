import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updatePassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true, // 🔴 cookie enable
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register user
  const registerUser = async (email, password) => {
    setLoading(true);
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(res.user);
    setUser(res.user);
    setLoading(false);
    return res.user;
  };

  // Login user
  const loginUser = async (email, password) => {
    setLoading(true);
    const res = await signInWithEmailAndPassword(auth, email, password);
    setUser(res.user);
    setLoading(false);
    return res.user;
  };

  // Google login
  const loginWithGoogle = async () => {
    setLoading(true);
    const res = await signInWithPopup(auth, googleProvider);
    setUser(res.user);
    setLoading(false);
    return res.user;
  };

  // Logout user
  const logoutUser = async () => {
    setLoading(true);
    await api.post("/logout");
    await signOut(auth);
    setUser(null);
    setLoading(false);
  };

  // Forgot password
  const resetPassword = async (email) => {
    setLoading(true);
    await sendPasswordResetEmail(auth, email);
    setLoading(false);
  };

  // Update password (for logged in user)
  const changePassword = async (newPassword) => {
    if (auth.currentUser) {
      setLoading(true);
      await updatePassword(auth.currentUser, newPassword);
      setLoading(false);
    } else {
      throw new Error("No user logged in");
    }
  };

  const profileUpdate = async ( profile) => {
    setLoading(true)
    return updateProfile(auth.currentUser, profile )
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      console.log("user data-->", currentUser);

      if (currentUser?.email) {
        await api.post("/jwt", { email: currentUser.email });
      } else {
        await api.post("/logout");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    loginWithGoogle,
    logoutUser,
    resetPassword,
    changePassword,
    profileUpdate
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
