// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8xaJxgqa0zf5NQ3ERFBCRXOU3nCIr-c0",
    authDomain: "tests-f8f05.firebaseapp.com",
    projectId: "tests-f8f05",
    storageBucket: "tests-f8f05.firebasestorage.app",
    messagingSenderId: "477654984745",
    appId: "1:477654984745:web:15bae0938b28421a5fd438",
    measurementId: "G-P6FMJR6V56",
    databaseURL: "https://tests-f8f05-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
