// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd02dYF_rJTBDkBNculjn7V44qZr9XHeo",
  authDomain: "argenzapas.firebaseapp.com",
  projectId: "argenzapas",
  storageBucket: "argenzapas.appspot.com",
  messagingSenderId: "198757951144",
  appId: "1:198757951144:web:69d7e2d6b62aa83d73849d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const dataBase = getFirestore (app);