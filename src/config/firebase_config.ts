import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWumFNQ9IC2rA-dhYodccn0ui-TER4Jtg",
  authDomain: "apartments-rental-app.firebaseapp.com",
  projectId: "apartments-rental-app",
  storageBucket: "apartments-rental-app.appspot.com",
  messagingSenderId: "140177558383",
  appId: "1:140177558383:web:47f134f30c65c7b08b369a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((res) => {
      console.log(res.user);
    })
    .catch((err: Error) => {
      console.log(err);
    });
};
