<template>
  <div v-if="questionDetails" class="space-y-4">
    <h2 class="text-2xl break-words">{{ questionDetails.question }}</h2>
    <template v-if="questionDetails.type === 'single'">
      <hr />
      <div
        class="flex items-center md:justify-between py-4 gap-4"
        v-for="(option, i) in questionDetails.answers"
        :key="i"
      >
        <label class="lg:text-lg break-all" :for="'option' + i">{{
          i + 1 + ") " + option
        }}</label>
        <input
          :id="'option' + i"
          type="radio"
          :name="'answer' + i"
          :key="i"
          v-model="userAnswer"
          class="w-min"
          :value="option"
        />
      </div>
    </template>
    <template v-if="questionDetails.type === 'multiple'">
      <hr />
      <div
        class="flex items-center md:justify-between py-4 gap-4"
        v-for="(option, i) in questionDetails.answers"
        :key="i"
      >
        <label class="lg:text-lg break-all" :for="'option' + i">{{
          i + 1 + ") " + option
        }}</label>
        <input
          :id="'option' + i"
          type="checkbox"
          :name="'answer' + i"
          :key="i"
          v-model="userAnswer"
          class="w-min"
          :value="option"
        />
      </div>
    </template>
    <template v-else-if="questionDetails.type === 'text'">
      <textarea
        class="bg-quaternary p-4 text-xl"
        name=""
        placeholder="Write your answer here!"
        id=""
        v-model="userAnswer"
        cols="30"
        rows="10"
      ></textarea>
    </template>
    <template class="space-y-4" v-else-if="questionDetails.type === 'degree'">
      <p class="text-primary text-xl">{{ rangeValue }}</p>
      <input v-model="rangeValue" type="range" @input="updateRangeValue" />
    </template>
    <template v-else-if="questionDetails.type === 'yes / no'">
      <div>
        <label class="text-lg" for="yes">Yes</label>
        <input
          id="yes"
          name="answer"
          v-model="userAnswer"
          class="w-min"
          value="yes"
          type="radio"
        />
      </div>
      <div>
        <label class="text-lg" for="no">No</label>
        <input
          id="no"
          name="answer"
          v-model="userAnswer"
          class="w-min"
          value="no"
          type="radio"
        />
      </div>
    </template>

    <button @click="nextQuestion" class="primary-button float-right">
      Next Question
    </button>
  </div>
</template>
<script setup lang="ts">
import { Question } from "~/interfaces/general";
const props = defineProps<{
  questionDetails: Question;
}>();
const emits = defineEmits<{
  (e: "answerDetails", value: string | string[]): void;
}>();

const userAnswer = ref([]);
const rangeValue = ref(50);
function updateRangeValue(event: Event) {
  const myEl = event.target as HTMLInputElement;
  rangeValue.value = parseInt(myEl.value);
}
function nextQuestion() {
  props.questionDetails.type === "degree"
    ? emits("answerDetails", rangeValue.value.toString())
    : userAnswer.value.length > 0
    ? emits("answerDetails", userAnswer.value)
    : alert("Answers must be filled");
  userAnswer.value = [];
}
</script>
types/general
