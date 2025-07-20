import React, { createContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import auth from "../Firebase/firebase.init";

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
    return updateProfile(auth.currentUser, profile)
      .catch((err) => {
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

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
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
    <authContext.Provider value={authData}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
