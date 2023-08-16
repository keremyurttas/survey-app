<template>
  <my-popup @close="$emit('close')">
    <template #header>{{ results.user }}</template>

    <div class="pt-8">
      <div class="mb-8" v-for="(question, i) in questions">
        <h4 class="text-xl">{{ question.question }}</h4>
        <span class="opacity-60">{{ results.answers[i].userOpinion }}</span>
      </div>
    </div>
  </my-popup>
</template>
<script setup lang="ts">
const props = defineProps<{
  results: any;
  questions: any;
}>();
const emit = defineEmits<{
  close: any;
}>();

// function mergeResultsAndQuestions() {
//   let res = [];
//   for (let i = 0; i < props.questions.length; i++) {
//     res.push(props.questions)
//   }
// }
console.log(props.results);
</script>
