
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCCQ4AhObIjdEv1OMfx9pbUqGcEKsNkd8",
  authDomain: "bruinmarket-cc504.firebaseapp.com",
  projectId: "bruinmarket-cc504",
  storageBucket: "bruinmarket-cc504.appspot.com",
  messagingSenderId: "6631642670",
  appId: "1:6631642670:web:ae6d95485d0d40895bf1bf",
  measurementId: "G-PNENCNQE2Q"
};

// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);
export default firebase;