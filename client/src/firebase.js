// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-13304.firebaseapp.com",
  projectId: "mern-estate-13304",
  storageBucket: "mern-estate-13304.appspot.com",
  messagingSenderId: "486089186642",
  appId: "1:486089186642:web:4ad3897379807e9ca9ae8b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
