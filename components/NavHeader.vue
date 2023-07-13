<template>
  <nav class="container py-10 flex gap-96 flex-row">
    <h1 class="lg:text-4xl text-2xl text-gray-300">
      <a href="/"> My<mark class="text-primary bg-primary">Survey</mark>App</a>
    </h1>

    <div class="flex justify-between w-full items-center text-xl">
      <button @click="handlePopup()">
        {{ loginStatus }}
      </button>
      <button class="text-primary">My Surveys</button>

      <button class="primary-button bg-tertary text-black">
        Create a Survey
      </button>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGeneralStore } from "~/store/general";

const generalStore = useGeneralStore();

const { changeVisibility, changeLoginStatus } = generalStore;
const { loginStatus } = storeToRefs(generalStore);
console.log(loginStatus);
function handlePopup() {
  if (loginStatus.value == "Log-in") {
    changeVisibility();
  } else {
    signOutUser();
    changeLoginStatus();
  }
}
</script>
