<template>
  <my-popup @close="changeVisibility()" :footer="false">
    <template #header>
      {{ modes[activeModeIndex] }}
    </template>
    <div class="flex items-center flex-col py-4">
      <span class="text-red-500 mb-4" v-if="errorMessage.trim() !== ''">{{
        errorMessage
      }}</span>
      <form onsubmit="return false" class="text-2xl flex flex-col gap-4">
        <label class="" for="mail">Email</label>
        <input
          autocomplete="email"
          v-model="email"
          class="px-2 py-1 rounded-md"
          id="mail"
          type="text"
        />
        <label for="password">Password</label>
        <input
          autocomplete="current-password"
          v-model="password"
          class="px-2 py-1 rounded-md mb-4"
          type="password"
          id="password"
        />

        <div class="flex flex-col gap-2 items-center">
          <button @click="handleSubmit()" class="primary-button w-max">
            Next
          </button>

          <button @click="changeMode">
            {{ activeModeIndex == 0 ? "Sign-up" : "Sign-in" }}
          </button>
        </div>
      </form>
    </div></my-popup
  >
</template>
<script setup lang="ts">
import { useGeneralStore } from "~/store/general";
const generalStore = useGeneralStore();
const { changeVisibility } = generalStore;
import { useFirebaseStore } from "~/store/firebase";
const firebaseStore = useFirebaseStore();
const { signInUser, createUser, getUserEmail } = firebaseStore;

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
  if (email.value.trim() !== "" && password.value.trim() !== "") {
    modes[activeModeIndex.value] === "sign-in"
      ? //check for is user signed in succesfuly.
        (await signInUser(email.value, password.value)) !== undefined
        ? succesfulLogin()
        : (errorMessage.value = "Check your informations")
      : //check for is user signed up succesfuly.
      (await createUser(email.value, password.value))
      ? succesfulLogin()
      : (errorMessage.value = "Check your e-mail address");
  }
}

function succesfulLogin() {
  changeVisibility();
  getUserEmail();
}
</script>
<style scoped>
input {
  @apply bg-tertary text-black;
}
</style>
