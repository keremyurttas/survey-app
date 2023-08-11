<template>
  <section class="lg:w-1/2 lg:h-2/3 bg-quaternary">
    <button @click="changeVisibility" class="esc-button">esc</button>

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
const { changeVisibility } = generalStore;
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
  //check for active mode
  modes[activeModeIndex.value] === "sign-in"
    ? //check for is user signed in succesfuly.
      (await signInUser(email.value, password.value))
      ? succesfulLogin()
      : (errorMessage.value = "Check your informations")
    : //check for is user signed up succesfuly.
    (await createUser(email.value, password.value))
    ? succesfulLogin()
    : (errorMessage.value = "Check your e-mail address");
}

function succesfulLogin() {
  changeVisibility();
  localStorage.setItem("user-email", email.value);
}
</script>
<style scoped>
input {
  @apply bg-tertary text-black;
}
</style>
