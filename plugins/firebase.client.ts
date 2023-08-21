import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

export let db: Firestore;

export default defineNuxtPlugin((nuxtApp) => {
  const apiKey = process.env.FIREBASE_API_KEY;
  const projectId = process.env.FIREBASE_PROJECT_ID;

  const firebaseConfig = {
    apiKey,
    projectId,
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  nuxtApp.provide("firestore", db); // Provide the Firestore instance to the app
});
