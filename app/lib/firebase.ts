// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtzaqOhR-y2H3vrlx5s6WNGuwPC_QxGD8",
  authDomain: "my-trips-pro.firebaseapp.com",
  projectId: "my-trips-pro",
  storageBucket: "my-trips-pro.firebasestorage.app",
  messagingSenderId: "833848740494",
  appId: "1:833848740494:web:5d771d7260ba49028517df"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app)
export const storage: FirebaseStorage = getStorage(app)