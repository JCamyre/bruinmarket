import { initializeApp } from "firebase/app"
import * as authentication from "firebase/auth"
import * as firestore from  "firebase/firestore"

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

  const app = initializeApp(firebaseConfig)
  const auth = authentication.getAuth(app)
  const database = firestore.getFirestore(app)

  export {app, auth, database, authentication, firestore, initializeApp}