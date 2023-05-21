// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1m7OI0chZKZvSEGeAda8buL9mzDhXoTQ",
  authDomain: "laundry-yt.firebaseapp.com",
  projectId: "laundry-yt",
  storageBucket: "laundry-yt.appspot.com",
  messagingSenderId: "123433015218",
  appId: "1:123433015218:web:440acf89331d2873b3b6ab",
  databaseURL: "https://laundry-yt-default-rtdb.firebaseio.com",

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// export const tripRef=collection(db,'trips')
// export const expenseRef=collection(db,'expenses')

export default { db, auth };
