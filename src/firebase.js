import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABnd7pMx8B9mYRK2iv7lr_j9fFmBjXcOE",
  authDomain: "blog-b379e.firebaseapp.com",
  projectId: "blog-b379e",
  storageBucket: "blog-b379e.appspot.com",
  messagingSenderId: "746476708051",
  appId: "1:746476708051:web:5dad26c9bf520c5a4ff426",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
