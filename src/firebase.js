import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFxBUUxCQ7hl33SboLNOO46Y8aeUNrEI4",
  authDomain: "sistema-agencia-viajes.firebaseapp.com",
  projectId: "sistema-agencia-viajes",
  storageBucket: "sistema-agencia-viajes.firebasestorage.app",
  messagingSenderId: "2364786758",
  appId: "1:2364786758:web:cee57fa8ec983ad7a72247",
  measurementId: "G-7YEHTNHXRW"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);