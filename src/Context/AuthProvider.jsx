import React, { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import auth from "../Firebase/firebase.init";
import axios from "axios";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Google Sign-In
  const loginWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .catch((err) => {
        console.error("Google Sign-In error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Email/Password Sign-In
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .catch((err) => {
        console.error("Email Sign-In error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Email/Password Registration
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .catch((err) => {
        console.error("Email Registration error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Update Profile
  const userUpdateProfile = (profile) => {
    return updateProfile(auth.currentUser, profile).catch((err) => {
      console.error("Profile update error:", err);
    });
  };

  // Sign-Out
  const logout = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        console.error("Logout error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        const idToken = await currentUser.getIdToken();
        try {
          const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/jwt`, {
            token: idToken,
          });
          localStorage.setItem("access-token", res.data.token);
        } catch (error) {
          console.error("JWT fetch failed", error);
          localStorage.removeItem("access-token");
        }
      } else {
    
        localStorage.removeItem("access-token");
      }
    });

    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    loading,
    loginWithGoogle,
    login,
    createUser,
    logout,
    userUpdateProfile,
  };

  return (
    <authContext.Provider value={authData}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
