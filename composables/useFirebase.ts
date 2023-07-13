import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useGeneralStore } from "~/store/general";
const generalStore = useGeneralStore();
const { changeVisibility } = generalStore;

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
