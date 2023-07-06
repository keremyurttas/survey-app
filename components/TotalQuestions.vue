<template>
  <h2 class="font-bold">{{ questions.length + 1 }}</h2>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuestionStudioStore } from "~/store/questionStudio";

const questionStudioStore = useQuestionStudioStore();
const { questions } = storeToRefs(questionStudioStore);
</script>
