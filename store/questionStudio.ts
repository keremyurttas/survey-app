import { defineStore } from "pinia";
import { surveyDetails,question } from "./interfaces";

////////Survey/////////
const surveyDetails: Ref<surveyDetails> = ref({ title: "", description: "" });

export const useQuestionStudioStore = defineStore("questionStudio", () => {
  const optionsList = ref(["single", "multiple", "text", "degree", "yes / no"]);
  const activeOptionType = ref("single");

  function changeOption(index: any) {
    activeOptionType.value = optionsList.value[index];
  }
  ////////Question/////////

  const questions: Ref<question[]> = ref([]);
  function addQuestion(question: question) {
    questions.value.push(question);
  }
  return {
    changeOption,
    activeOptionType,
    optionsList,
    addQuestion,
    questions,
    surveyDetails,
  };
});
