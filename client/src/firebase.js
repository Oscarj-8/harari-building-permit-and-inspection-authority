// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "harari-building-permit-5d223.firebaseapp.com",
  projectId: "harari-building-permit-5d223",
  storageBucket: "harari-building-permit-5d223.appspot.com",
  messagingSenderId: "815729823341",
  appId: "1:815729823341:web:26149e01362b9e7fb3b964",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
