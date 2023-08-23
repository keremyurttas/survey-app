<template>
  <my-popup @close="$emit('close')">
    <template #header>{{ results.user }}</template>

    <div class="py-4">
      <div class="mb-8" v-for="(question, i) in questions" :key="i">
        <h4 class="text-xl">{{ question.question }}</h4>
        <span class="opacity-60">{{
          formattedResults(results.answers[i].userOpinion)
        }}</span>
      </div>
    </div>
  </my-popup>
</template>
<script setup lang="ts">
import { Result } from "types/general";

const props = defineProps<{
  results: any;
  questions: any;
}>();
const emit = defineEmits<{
  close: any;
}>();
function formattedResults(result: Result) {
  if (typeof result === "object") {
    const modifiedArray = Object.values(result).map((val) => {
      if (Array.isArray(val)) {
        return Array.isArray(val); // Convert array to concatenated string
      }
      return val;
    });
    return modifiedArray.toString(); // Return the modified array
  }

  return result; // Return the result as-is
}
</script>
