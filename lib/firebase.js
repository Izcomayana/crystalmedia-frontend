// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// or import { getDatabase } for Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyDuc_5mqNqjnRDxAOo_cYXbQ0zNHuzCZD8",
  authDomain: "crystalmediatech.firebaseapp.com",
  projectId: "crystalmediatech",
  storageBucket: "crystalmediatech.firebasestorage.app",
  messagingSenderId: "337761152723",
  appId: "1:337761152723:web:4f8f5dbe7f1215bd9dee26",
  measurementId: "G-CSGW99YFQJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Use getDatabase(app) for Realtime Database

export { db };



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
  // apiKey: "AIzaSyDuc_5mqNqjnRDxAOo_cYXbQ0zNHuzCZD8",
  // authDomain: "crystalmediatech.firebaseapp.com",
  // projectId: "crystalmediatech",
  // storageBucket: "crystalmediatech.firebasestorage.app",
  // messagingSenderId: "337761152723",
  // appId: "1:337761152723:web:4f8f5dbe7f1215bd9dee26",
  // measurementId: "G-CSGW99YFQJ"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);