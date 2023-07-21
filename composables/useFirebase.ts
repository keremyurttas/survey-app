import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const createUser = async (email: string, password: string) => {
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
};
export const signInUser = async (email: string, password: string) => {
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

  return credentials;
};
export const initUser = async () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      return true;
    } else {
      return false;
    }
  });
};

export const signOutUser = async () => {
  const auth = getAuth();
  const result = await auth.signOut();
  console.log("Sign out:", result);
  localStorage.setItem("user-email", "");
};

import {
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Result } from "types/store";
import { db } from "~/plugins/firebase.client";
import { Survey } from "~/types/composables";
export const sendSurvey = async (survey: Survey) => {
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
};

export const getSurveyById = async (id: string) => {
  const docRef = doc(db, "surveys", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log(docSnap.data());
  } else {
    console.log("No such document.");
  }
  return docSnap.data();
};

export const sendResult = async (result: Result) => {
  try {
    const docRef = await addDoc(
      collection(db, "answers", result.surveyOwner, result.surveyId),
      {
        result,
      }
    );
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// export const getSurveysByEmail = async (email: string) => {
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
export const getSurveysByEmail = async (email: string) => {
  try {
    const q = query(collection(db, "surveys"), where("owner", "==", email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc);
    });
  } catch (error) {
    console.error("Error fetching surveys:", error);
  }
};

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
