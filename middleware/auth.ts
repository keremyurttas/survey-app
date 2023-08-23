import { useFirebaseStore } from "~/store/firebase";
import { storeToRefs } from "pinia";
const { initializeActiveUser } = useFirebaseStore();
const { activeUser } = storeToRefs(useFirebaseStore());
export default defineNuxtRouteMiddleware(async (to, from) => {
  const router = useRouter();
  await initializeActiveUser();

  if (!activeUser.value) {
    // If active user is not present, navigate to login page
    router.push("/?loginModal=true");
  } else {
    // Active user is present, allow navigation
    // Note: You can add any additional checks or logic here
  }
});
