import { defineStore } from "pinia";

export const useQuestionStudioStore = defineStore("questionStudio", () => {
  const optionsList = ref(["single", "multiple", "text", "degree", "yes / no"]);
  const activeOptionType = ref("single");

  function changeOption(index: any) {
    activeOptionType.value = optionsList.value[index];
  }
  ////////Question/////////

  const questions = ref([]);
  function addQuestion(question: object) {
    questions.value.push(question);
  }
  return {
    changeOption,
    activeOptionType,
    optionsList,
    addQuestion,
    questions,
  };
});
