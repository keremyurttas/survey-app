import { defineStore } from "pinia";
import {
  getAuth,
  createUserWithEmailAndPassword,
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
import { Result, SurveyDetails, Survey } from "interfaces/general";
import { db } from "~/plugins/firebase.client";
const isLoading = ref(false);

export const useFirebaseStore = defineStore("firebaseStore", () => {
  async function createUser(email: string, password: string) {
    isLoading.value = true;

    try {
      const auth = getAuth();
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Successful user creation
      window.localStorage.setItem("activeUser", email);

      isLoading.value = false;
      return credentials;
    } catch (error) {
      // Handle error
      console.error("Error creating user:", error);
      isLoading.value = false;
      return null; // Return null or customize your error handling
    }
  }
  async function signInUser(email: string, password: string) {
    isLoading.value = true;
    const auth = getAuth();
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      window.localStorage.setItem("activeUser", email);
      initializeActiveUser();
      isLoading.value = false;
      return credentials;
    } catch (error: unknown) {
      if (error) {
        console.log(error);
        // You can handle the specific authentication error here
      } else {
        // Handle other types of errors
      }
      isLoading.value = false;
    }
  }

  async function sendSurvey(survey: Survey) {
    isLoading.value = true;
    try {
      const docRef = await addDoc(collection(db, "surveys"), {
        title: survey.title,
        description: survey.description,
        owner: survey.owner,
        date: survey.date,
        questions: survey.questions,
      });
      console.log("Document written with ID: ", docRef.id);
      isLoading.value = false;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function getSurveyById(id: string): Promise<SurveyDetails | undefined> {
    isLoading.value = true;
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
      isLoading.value = false;
      return survey;
    } else {
      console.log("No such document.");
      isLoading.value = false;
      return undefined;
    }
  }

  async function sendResult(result: Result) {
    isLoading.value = true;
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
    isLoading.value = false;
  }

  async function getSurveysByEmail(
    email: string
  ): Promise<Survey[] | undefined> {
    isLoading.value = true;
    try {
      const q = query(collection(db, "surveys"), where("owner", "==", email));
      const querySnapshot = await getDocs(q);
      let surveys: Survey[] = [];
      querySnapshot.forEach((doc) => {
        surveys.push({ id: doc.id, ...doc.data() } as Survey);
      });
      isLoading.value = false;
      return surveys;
    } catch (error) {
      console.error("Error fetching surveys:", error);
    }
  }

  async function getResponsesById(id: string) {
    isLoading.value = true;
    const q = query(collection(db, "responses", activeUser.value, id));
    const querySnapshot = await getDocs(q);
    const responses = querySnapshot.docs.map((doc) => doc.data());
    isLoading.value = false;
    return responses; // Return the responses array
  }

  const activeUser = ref();
  function initializeActiveUser() {
    if (process.client) {
      activeUser.value = localStorage.getItem("activeUser");
    }
  }
  function getUserEmail() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      activeUser.value = user.email;

      return user.email;
    }
  }
  async function signOutUser() {
    isLoading.value = true;
    const auth = getAuth();
    const result = await auth.signOut();
    localStorage.removeItem("activeUser");
    activeUser.value = undefined;
    initializeActiveUser();
    useRouter().push({
      path: "/",
    });
    isLoading.value = false;
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
    isLoading,
  };
});
