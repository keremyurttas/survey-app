<template>
  <section class="container gap-10 px-5">
    <h2 class="text-center text-3xl text-gray-300">
      {{ surveyDetails.title }}
    </h2>
    <div class="text-2xl flex justify-between mb-10">
      <div>
        <span>Question </span>
        <total-questions class="inline"></total-questions>
      </div>
      <button
        @click="isAllQuestionsVisible = !isAllQuestionsVisible"
        class="underline"
      >
        All Questions
      </button>
    </div>
    <question-type-selector></question-type-selector>
    <add-question-and-answer></add-question-and-answer>
    <all-questions
      v-if="isAllQuestionsVisible"
      @close="isAllQuestionsVisible = false"
    ></all-questions>
  </section>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuestionStudioStore } from "~/store/questionStudio";
const questionStudio = useQuestionStudioStore();
const { surveyDetails } = storeToRefs(questionStudio);
const isAllQuestionsVisible = ref(false);
</script>
