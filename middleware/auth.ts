import { useFirebaseStore } from "~/store/firebase";
import { storeToRefs } from "pinia";
const { initializeActiveUser } = useFirebaseStore();
const { activeUser } = storeToRefs(useFirebaseStore());
export default defineNuxtRouteMiddleware(async (to, from) => {
  const router = useRouter();
  await initializeActiveUser(); // Make sure to await the initialization
  {
    if (!activeUser.value) {
      router.push("/?loginModal=true");
    }
  }
});
