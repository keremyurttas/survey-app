import { defineStore } from "pinia";
import { Question } from "types/store";
export const useDisplaySurvey = defineStore("displaySurvey", () => {
  const questions: Ref<Question[]> = ref([]);
  function assignQuestions(allQuestions: Question[]) {
    questions.value = allQuestions;
  }
  return { questions, assignQuestions };
});
