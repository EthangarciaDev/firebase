// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJ4gf7TnCUeLt5qROa7_yRuQdHcd38TvE",
  authDomain: "test-a3331.firebaseapp.com",
  projectId: "test-a3331",
  storageBucket: "test-a3331.firebasestorage.app",
  messagingSenderId: "768488160459",
  appId: "1:768488160459:web:f8416a61186ef53245af4e"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;