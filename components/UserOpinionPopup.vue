<template>
  <div
    class="popup bg-secondary container h-min p-16 flex-col gap-4 items-start bg-opacity-50"
  >
    <button class="esc-button" @click="emit('close')">ESC</button>
    <h4 class="text-3xl">{{ results.user }}</h4>
    <div class="h-1 w-full bg-tertary"></div>

    <div v-for="(question, i) in questions">
      <h4 class="text-xl">{{ question.question }}</h4>
      <span>{{ results.answers[i].userOpinion }}</span>
    </div>
  </div>
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
