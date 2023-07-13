<template>
  <section class="w-1/2 h-2/3 bg-quaternary">
    <button
      @click="changeVisibility"
      class="absolute right-8 top-8 text-xl bg-tertary p-2 text-black rounded-xl"
    >
      esc
    </button>

    <div class="flex items-center flex-col gap-12">
      <h3 class="text-4xl capitalize">{{ modes[activeModeIndex] }}</h3>
      <span class="text-red-500" v-if="errorMessage.trim() !== ''">{{
        errorMessage
      }}</span>
      <div class="text-2xl flex flex-col gap-4">
        <label class="" for="mail">Email</label>
        <input v-model="email" class="" id="mail" type="text" />
        <label for="password">Password</label>
        <input v-model="password" class="" type="password" id="password" />
      </div>
      <div class="flex flex-col gap-2">
        <button @click="handleSubmit" class="primary-button">Next</button>
        <button @click="changeMode">
          {{ activeModeIndex == 0 ? "Sign-up" : "Sign-in" }}
        </button>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useGeneralStore } from "~/store/general";
const generalStore = useGeneralStore();
const { changeVisibility, changeLoginStatus } = generalStore;
const errorMessage = ref("");

const modes = ["sign-in", "sign-up"];
const activeModeIndex = ref(0);
function changeMode() {
  activeModeIndex.value == 0
    ? activeModeIndex.value++
    : activeModeIndex.value--;
}

const email = ref("");
const password = ref("");

async function handleSubmit() {
  modes[activeModeIndex.value] === "sign-in"
    ? (await signInUser(email.value, password.value))
      ? (changeVisibility(),
        localStorage.setItem("user-email", email.value),
        changeLoginStatus())
      : (errorMessage.value = "Check your informations")
    : (await createUser(email.value, password.value))
    ? (changeVisibility(),
      localStorage.setItem("user-email", email.value),
      changeLoginStatus())
    : (errorMessage.value = "Check your e-mail address");
}
</script>
<style scoped>
input {
  @apply bg-tertary text-black;
}
</style>
