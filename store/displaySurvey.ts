import { defineStore } from "pinia";
import { Question } from "types/store";
export const useDisplaySurvey = defineStore("displaySurvey", () => {
  const questions: Ref<Question[]> = ref([]);
  function assignQuestions(allQuestions: []) {
    questions.value = allQuestions;
    console.log(questions.value);
  }
  return { questions, assignQuestions };
});
