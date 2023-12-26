// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// Import the firebase authentication functions
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// Import the firebase database functions
import { getFirestore } from 'firebase/firestore';

// Import the vite-env keys
const apiKey = import.meta.env.VITE_API_KEY;
const authDomain = import.meta.env.VITE_AUTH_DOMAIN;
const messagingSenderId = import.meta.env.VITE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_APP_ID;

// Project app's Firebase configuration
const firebaseConfig = {
	apiKey: `${apiKey}`,
	authDomain: `${authDomain}`,
	projectId: 'learn-firebase-crud-5483b',
	storageBucket: 'learn-firebase-crud-5483b.appspot.com',
	messagingSenderId: `${messagingSenderId}`,
	appId: `${appId}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


// Create the variable for the database access
export const db = getFirestore(app);

// Initialize GoogleAuthProvider
export const googleAuthProvider = new GoogleAuthProvider();




