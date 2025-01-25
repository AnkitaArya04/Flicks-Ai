// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-generate-video-a0209.firebaseapp.com",
  projectId: "ai-generate-video-a0209",
  storageBucket: "ai-generate-video-a0209.firebasestorage.app",
  messagingSenderId: "906253132912",
  appId: "1:906253132912:web:68763593352d02a41a00b5",
  measurementId: "G-CC5P68KJCE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);