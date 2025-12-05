import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Replace with your actual Firebase project configuration
// Get this from: Firebase Console > Project Settings > General > Your apps > SDK setup and configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQZFl4x4Yf7H4tEGufQhd6nFAIYbGLUtI",
  authDomain: "stls-64583.firebaseapp.com",
  projectId: "stls-64583",
  storageBucket: "stls-64583.firebasestorage.app",
  messagingSenderId: "1007685927908",
  appId: "1:1007685927908:web:e1ea232ce7d81d742e7df1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
