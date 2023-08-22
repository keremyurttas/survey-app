import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

export let db: Firestore;

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.public.FIREBASE_API_KEY,
    projectId: config.public.FIREBASE_PROJECT_ID,
  };

  const app = initializeApp(firebaseConfig);

  db = getFirestore(app);
});
