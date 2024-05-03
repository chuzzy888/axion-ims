import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBvxDIFw29TSuzYXLYyxQa-HXLHNOy_rRU",
    authDomain: "axion-ims.firebaseapp.com",
    projectId: "axion-ims",
    storageBucket: "axion-ims.appspot.com",
    messagingSenderId: "271637993365",
    appId: "1:271637993365:web:276b94dab81df89d3e489c",
    measurementId: "G-2LJDYDQ67D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
export { auth, db, googleProvider };