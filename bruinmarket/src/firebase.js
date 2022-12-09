import { initializeApp } from "firebase/app";
import * as authentication from "firebase/auth";
import * as firestore from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// TODO: add firebaseConfig fields to .env instead of hardcoding them 
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
  };
// Import the functions you need from the SDKs you need

const app = initializeApp(firebaseConfig);
const auth = authentication.getAuth(app);
const database = firestore.getFirestore(app);
const storage = getStorage(app);

export {
  app,
  auth,
  database,
  authentication,
  firestore,
  initializeApp,
  storage,
};
