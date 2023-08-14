import { defineStore } from "pinia";
import { Survey } from "types/composables";
import { SurveyDetails, Question } from "~/types/store";
////////Survey/////////
const surveyDetails = ref<SurveyDetails>({
  title: "",
  description: "",
  date: 0,
  owner: "",
  questions: [
    {
      type: "",
      question: "",
      answers: [],
    },
  ],
});

export const useQuestionStudioStore = defineStore("questionStudio", () => {
  const optionsList = ref(["single", "multiple", "text", "degree", "yes / no"]);
  const activeOptionType = ref("single");

  function changeOption(index: number) {
    activeOptionType.value = optionsList.value[index];
  }
  function changeSurveyDetails(title: string, description: string) {
    surveyDetails.value.title = title;
    surveyDetails.value.description = description;
  }
  ////////Question/////////

  const questions: Ref<Question[]> = ref([]);
  function addQuestion(question: Question) {
    questions.value.push(question);
  }

  function getSurvey(): Survey {
    return {
      title: surveyDetails.value.title,
      description: surveyDetails.value.description,
      owner: localStorage.getItem("user-email"),
      date: Date.now(),
      questions: questions.value,
      id: "",
    };
  }
  return {
    changeOption,
    activeOptionType,
    optionsList,
    addQuestion,
    questions,
    surveyDetails,
    changeSurveyDetails,
    getSurvey,
  };
});
