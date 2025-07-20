import React, { createContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import auth from "../Firebase/firebase.init";
export const authContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);



  // Google Sign-In
  const loginWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Google Sign-In error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Email/Password Sign-In
  const login = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("Email Sign-In error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Email/Password Registration
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("Email Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Sign-Out
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
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
  };

  return (
    <authContext.Provider value={authData}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
