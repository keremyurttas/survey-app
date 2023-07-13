<template>
  <section class="popup flex justify-center items-center">
    <div
      class="z-50 flex items-center flex-col gap-20 p-20 bg-quaternary rounded-lg w-2/3 h-2/3 relative"
    >
      <button
        class="absolute right-8 top-8 text-xl bg-tertary p-2 text-black rounded-xl"
        @click="emit('close')"
      >
        esc
      </button>
      <h2 class="text-2xl font-semibold">Questions</h2>

      <div class="space-y-4 overflow-auto w-full">
        <div
          class="text-2xl"
          v-if="questions.length > 0"
          v-for="question in questions"
        >
          <p class="truncate">{{ question.question }}</p>
          <hr />
          <span class="text-xl"
            ><strong>Type:</strong> {{ question.type }}</span
          >
        </div>
        <span v-else>You have not added any questions yet.</span>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  close: any;
}>();
import { storeToRefs } from "pinia";
import { useQuestionStudioStore } from "~/store/questionStudio";

const questionStudio = useQuestionStudioStore();
const { questions } = storeToRefs(questionStudio);
</script>
