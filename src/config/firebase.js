import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyDola4hqDvblo6jhFxriY0JC1I7VyqfNFE",
  authDomain: "twitter-clone-362d5.firebaseapp.com",
  projectId: "twitter-clone-362d5",
  storageBucket: "twitter-clone-362d5.appspot.com",
  messagingSenderId: "131716501847",
  appId: "1:131716501847:web:72571aed8fc4c0262dae12",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, provider, db };
