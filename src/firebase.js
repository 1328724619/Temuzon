// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
// import other services as needed

const firebaseConfig = {
  apiKey: "AIzaSyDxWzjeHiLj80T251SEepITcTrf47tVhn8",
  authDomain: "clone-d9244.firebaseapp.com",
  projectId: "clone-d9244",
  storageBucket: "clone-d9244.firebasestorage.app",
  messagingSenderId: "19594665169",
  appId: "1:19594665169:web:f48250fbae3f53827cf9f0",
  measurementId: "G-WS7HBTHX4J",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
