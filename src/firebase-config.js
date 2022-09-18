import { initializeApp } from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";
// import { getDatabase } from "firebase/database";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYxb7IW5K91CosJCvhBQJLJf1JCqyFAdg",
  authDomain: "intern-acfa2.firebaseapp.com",
  databaseURL: "https://intern-acfa2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "intern-acfa2",
  storageBucket: "intern-acfa2.appspot.com",
  messagingSenderId: "746192546888",
  appId: "1:746192546888:web:ff3e9522dac3f97c067c7d",
  measurementId: "G-MT565D1B8N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const db=getDatabase(app);