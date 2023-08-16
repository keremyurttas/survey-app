import { defineStore } from "pinia";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { Result, SurveyDetails } from "types/store";
import { db } from "~/plugins/firebase.client";
import { Survey } from "~/types/composables";

export const useFirebaseStore = defineStore("firebaseStore", () => {
  async function createUser(email: string, password: string) {
    const auth = getAuth();
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    console.log(credentials);
    return credentials;
  }
  async function signInUser(email: string, password: string) {
    let isThereError = false;
    const auth = getAuth();
    const credentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      isThereError = true;
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    window.localStorage.setItem("activeUser", email);
    return credentials;
  }
  // const initUser = computed(() => {
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  //   if (user) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });

  async function sendSurvey(survey: Survey) {
    try {
      const docRef = await addDoc(collection(db, "surveys"), {
        title: survey.title,
        description: survey.description,
        owner: survey.owner,
        date: survey.date,
        questions: survey.questions,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function getSurveyById(id: string): Promise<SurveyDetails | undefined> {
    const docRef = doc(db, "surveys", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as DocumentData;

      const survey: SurveyDetails = {
        title: data.title || "",
        description: data.description || "",
        date: data.date || 0,
        owner: data.owner || "",
        questions: data.questions || [],
      };

      return survey;
    } else {
      console.log("No such document.");
      return undefined;
    }
  }

  async function sendResult(result: Result) {
    try {
      const docRef = await addDoc(
        collection(db, "responses", result.surveyOwner, result.surveyId),
        {
          ...result,
        }
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // export const getSurveysByEmail(email: string) => {
  //   const querySnapshot = doc(db, "surveys", "owners", email);
  //   querySnapshot.forEach((element) => {
  //     console.log((el: any) => el.data());
  //   });
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:" + docSnap.data());
  //   } else {
  //     console.log("No such a doc.");
  //   }
  // };
  async function getSurveysByEmail(
    email: string
  ): Promise<Survey[] | undefined> {
    try {
      const q = query(collection(db, "surveys"), where("owner", "==", email));
      const querySnapshot = await getDocs(q);
      let surveys: Survey[] = [];
      querySnapshot.forEach((doc) => {
        surveys.push({ id: doc.id, ...doc.data() } as Survey);
      });
      console.log(querySnapshot);
      return surveys;
    } catch (error) {
      console.error("Error fetching surveys:", error);
    }
  }

  async function getResponsesById(id: string) {
    const q = query(collection(db, "responses", activeUser.value, id));
    const querySnapshot = await getDocs(q);
    const responses = querySnapshot.docs.map((doc) => doc.data());
    console.log(querySnapshot);

    return responses; // Return the responses array
  }

  // export const signInUserWGoogle = async () => {
  //   const provider = new GoogleAuthProvider();
  //   const auth = getAuth();
  //   const info = await signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential?.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       // IdP data available using getAdditionalUserInfo(result)
  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  //   return info;
  // };

  const activeUser = ref();
  function initializeActiveUser() {
    activeUser.value = localStorage.getItem("activeUser");
  }
  function getUserEmail() {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    if (user !== null) {
      activeUser.value = user.email;

      return user.email;
    }
  }
  async function signOutUser() {
    const auth = getAuth();
    const result = await auth.signOut();
    localStorage.removeItem("activeUser");
    activeUser.value = undefined;
  }

  return {
    createUser,
    signInUser,

    signOutUser,
    sendSurvey,
    getSurveyById,
    sendResult,
    getSurveysByEmail,
    getResponsesById,
    activeUser,
    getUserEmail,
    initializeActiveUser,
  };
});