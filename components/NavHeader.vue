<template>
  <nav class="container py-10 flex lg:gap-96 flex-row justify-between px-4">
    <h1 class="lg:text-4xl text-2xl text-gray-300">
      <a href="/"> My<mark class="text-primary bg-primary">Survey</mark>App</a>
    </h1>
    <!-- 
    <div class="lg:flex justify-evenly w-full items-center text-xl">
      <button @click="handlePopup()">
        {{ handleLoginStatus }}
      </button>

      <div v-if="handleLoginStatus == 'Log-out'" class="text-primary">
        <nuxt-link to="/mySurveys"> My Surveys </nuxt-link>
      </div>

      <nuxt-link to="createSurvey" class="primary-button bg-tertary text-black">
        Create a Survey
      </nuxt-link>
    </div> -->
    <div class="">
      <button
        @click="isMobileNavBarActive = !isMobileNavBarActive"
        class="block lg:hidden right-0 text-xl float-right lg:float-none"
      >
        More
      </button>
      <div
        v-if="isMobileNavBarActive"
        class="float-right absolute md:hidden right-4 top-16 z-30 bg-none bg-quaternary flex flex-col items-center p-4 mt-4 border rounded-lg text-xl space-y-4"
      >
        <button @click="handlePopup()">
          {{ handleLoginStatus }}
        </button>

        <div v-if="handleLoginStatus == 'Log-out'" class="text-primary">
          <nuxt-link to="/mySurveys"> My Surveys </nuxt-link>
        </div>

        <nuxt-link
          to="createSurvey"
          class="primary-button bg-tertary text-black text-center"
        >
          Create a Survey
        </nuxt-link>
      </div>
      <div
        class="w-auto hidden float-none md:relative md:bg-none md:flex items-center flex-row space-x-16 mt-0 border-0 text-xl space-y-4 space-y-0"
      >
        <button @click="handlePopup()">
          {{ handleLoginStatus }}
        </button>

        <div v-if="handleLoginStatus == 'Log-out'" class="text-primary">
          <nuxt-link to="/mySurveys"> My Surveys </nuxt-link>
        </div>

        <nuxt-link
          to="createSurvey"
          class="primary-button bg-tertary text-black text-center"
        >
          Create a Survey
        </nuxt-link>
      </div>
    </div>
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
const isMobileNavBarActive = ref(false);
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
