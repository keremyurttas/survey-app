<template>
  <div class="">
    <loading-modal v-if="isLoading"> </loading-modal>
    <login v-if="isLoginPopupVisible"></login>
    <nav-header></nav-header>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGeneralStore } from "~/store/general";
const generalStore = useGeneralStore();
import { useFirebaseStore } from "~/store/firebase";
const firebaseStore = useFirebaseStore();
const { isLoading } = storeToRefs(firebaseStore);

const { isLoginPopupVisible } = storeToRefs(generalStore);
onBeforeMount(() => {
  const config = useRuntimeConfig();
  console.log(config.public.FIREBASE_API_KEY);
});
</script>
