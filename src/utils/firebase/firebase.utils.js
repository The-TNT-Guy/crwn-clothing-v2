import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// The web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbSJVf4NOIY-4P5eiGjrdmSa5NWRQJaRI",
  authDomain: "crwn-clothing-db-6599d.firebaseapp.com",
  projectId: "crwn-clothing-db-6599d",
  storageBucket: "crwn-clothing-db-6599d.appspot.com",
  messagingSenderId: "692260703496",
  appId: "1:692260703496:web:15d3db42e69d18aa40f0bd",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      }); 
    } catch (error) {
        console.log('Error creating the user', error.message);
    }
  }

  return userDocRef;
};
