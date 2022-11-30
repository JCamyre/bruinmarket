// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCCQ4AhObIjdEv1OMfx9pbUqGcEKsNkd8",
    authDomain: "bruinmarket-cc504.firebaseapp.com",
    projectId: "bruinmarket-cc504",
    storageBucket: "bruinmarket-cc504.appspot.com",
    messagingSenderId: "6631642670",
    appId: "1:6631642670:web:ae6d95485d0d40895bf1bf",
    measurementId: "G-PNENCNQE2Q"
  };// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
