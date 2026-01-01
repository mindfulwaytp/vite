import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAT7-kqBnBHPXoNFmyejfuiNwgtiq1zbxo",
  authDomain: "mindfulway-intranet.firebaseapp.com",
  projectId: "mindfulway-intranet",
  storageBucket: "mindfulway-intranet.firebasestorage.app",
  messagingSenderId: "883128012301",
  appId: "1:883128012301:web:62ea1020d5d73dc3534f44",
  measurementId: "G-PXECLGKSJY"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);