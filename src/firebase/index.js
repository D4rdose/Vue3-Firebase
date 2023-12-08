
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCwFQIIT8usVWjoW3Wvql5dqiTXRMp0TyQ",
  authDomain: "simpletodowithfirebase.firebaseapp.com",
  projectId: "simpletodowithfirebase",
  storageBucket: "simpletodowithfirebase.appspot.com",
  messagingSenderId: "5866710287",
  appId: "1:5866710287:web:a7e7c35f4804c871664a7a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
};