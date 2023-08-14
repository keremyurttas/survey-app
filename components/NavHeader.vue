<template>
  <nav class="container py-10 flex lg:gap-96 flex-row justify-between px-4">
    <h1 class="lg:text-4xl text-2xl text-gray-300">
      <a href="/"> My<mark class="text-primary bg-primary">Survey</mark>App</a>
    </h1>

    <div class="hidden lg:flex justify-evenly w-full items-center text-xl">
      <button @click="handlePopup()">
        {{ handleLoginStatus }}
      </button>

      <div v-if="handleLoginStatus == 'Log-out'" class="text-primary">
        <nuxt-link to="/mySurveys"> My Surveys </nuxt-link>
      </div>

      <nuxt-link to="createSurvey" class="primary-button bg-tertary text-black">
        Create a Survey
      </nuxt-link>
    </div>
    <button class="block lg:hidden">More</button>
  </nav>
</template>
<script setup lang="ts">
import { useGeneralStore } from "~/store/general";
import { useFirebaseStore } from "~/store/firebase";
const firebaseStore = useFirebaseStore();
const { signOutUser, initializeActiveUser } = firebaseStore;
const generalStore = useGeneralStore();
const { changeVisibility } = generalStore;
import { storeToRefs } from "pinia";
const activeUser = storeToRefs(firebaseStore);
const handleLoginStatus = computed(() => {
  return activeUser.activeUser.value ? "Log-out" : "Log-in";
});
onMounted(() => {
  initializeActiveUser();
});
function handlePopup() {
  if (handleLoginStatus.value == "Log-out") {
    signOutUser();
  } else {
    changeVisibility();
  }
}
</script>
