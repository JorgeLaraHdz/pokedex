import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getMessaging, Messaging} from 'firebase/messaging'
// firebase-config.ts
export const firebaseConfig = {
    apiKey: "AIzaSyDPBVznrVUXcLFsBcK78daEObcfQjZoBSY",
    authDomain: "chessa-f2943.firebaseapp.com",
    projectId: "chessa-f2943",
    storageBucket: "chessa-f2943.appspot.com",
    messagingSenderId: "686757224967",
    appId: "1:686757224967:web:cddc0bc5bffe8fa93400a2"
  };
  
  const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const messaging = getMessaging(app); // Messaging instance