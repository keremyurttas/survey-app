<template>
  <nav class="container py-10 flex lg:gap-96 flex-row justify-between px-4">
    <h1 class="lg:text-4xl text-2xl text-gray-300">
      <a href="/"> My<mark class="text-primary bg-primary">Survey</mark>App</a>
    </h1>

    <div class="hidden lg:flex justify-evenly w-full items-center text-xl">
      <button @click="handlePopup()">
        {{ loginStatus }}
      </button>
      <div v-if="loginStatus == 'Log-out'" class="text-primary">
        <nuxt-link to="/mySurveys"> My Surveys </nuxt-link>
      </div>

      <button @click="addData" class="primary-button bg-tertary text-black">
        Create a Survey
      </button>
    </div>
    <button class="block lg:hidden">More</button>
  </nav>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGeneralStore } from "~/store/general";

const generalStore = useGeneralStore();
const { changeVisibility, changeLoginStatus } = generalStore;
const { loginStatus } = storeToRefs(generalStore);
function handlePopup() {
  if (loginStatus.value == "Log-in") {
    changeVisibility();
  } else {
    signOutUser();
    changeLoginStatus();
  }
}
</script>
