<template>
  <div class="">
    <login class="popup" v-if="isLoginPopupVisible"></login>
    <nav-header></nav-header>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGeneralStore } from "~/store/general";
const generalStore = useGeneralStore();

const { isLoginPopupVisible } = storeToRefs(generalStore);
</script>
