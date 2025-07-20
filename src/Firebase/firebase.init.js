// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANGCg5UfxBWKuFLN1qm3Fw3_LMIRBP27A",
  authDomain: "food-waste-reduction-f0009.firebaseapp.com",
  projectId: "food-waste-reduction-f0009",
  storageBucket: "food-waste-reduction-f0009.firebasestorage.app",
  messagingSenderId: "464909133760",
  appId: "1:464909133760:web:22fd31e3edfd35c0e68a25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;