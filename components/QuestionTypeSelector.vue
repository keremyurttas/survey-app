<template>
  <div class="flex justify-between w-full text-3xl">
    <div
      v-for="(option, index) in optionsList"
      :key="index"
      class="flex flex-col items-center gap-2 lg:gap-4"
    >
      <label class="lg:text-3xl text-lg capitalize" :for="option">{{
        option
      }}</label>
      <input
        v-model="activeOptionType"
        class="text-gray-300 w-min checked:shadow-primary_hover_circle"
        type="radio"
        name="answer_type"
        ref="test"
        :value="option"
        :id="option"
        @input="changeOption(index)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useQuestionStudioStore } from "~/store/questionStudio";
import { storeToRefs } from "pinia";

const QuestionStudioStore = useQuestionStudioStore();
const { changeOption } = QuestionStudioStore;
const { activeOptionType, optionsList } = storeToRefs(QuestionStudioStore);
</script>
store/addQuestion
