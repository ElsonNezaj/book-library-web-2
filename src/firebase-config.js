// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrSTja33km1uAke5-EmyYZLpndLJ_1REQ",
  authDomain: "book-lib-dip.firebaseapp.com",
  projectId: "book-lib-dip",
  storageBucket: "book-lib-dip.appspot.com",
  messagingSenderId: "381160943787",
  appId: "1:381160943787:web:c23106b6964cc00914c7ee",
  measurementId: "G-YVD74PVRKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(app);

// Export the Firestore database
export { db };