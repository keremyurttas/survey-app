<template>
  <my-popup @close="$emit('close')">
    <template #header>
      <h2>Questions</h2>
    </template>
    <section class="py-16">
      <div class="z-50 flex items-center flex-col gap-20 rounded-lg relative">
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
  </my-popup>
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
