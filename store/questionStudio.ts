import { defineStore } from "pinia";
import { SurveyDetails, Question } from "~/types/store";
////////Survey/////////
const surveyDetails: Ref<SurveyDetails> = ref({ title: "", description: "" });

export const useQuestionStudioStore = defineStore("questionStudio", () => {
  const optionsList = ref(["single", "multiple", "text", "degree", "yes / no"]);
  const activeOptionType = ref("single");

  function changeOption(index: any) {
    activeOptionType.value = optionsList.value[index];
  }
  function changeSurveyDetails(title: string, description: string) {
    surveyDetails.value.title = title;
    surveyDetails.value.description = description;
    console.log(surveyDetails.value);
  }
  ////////Question/////////

  const questions: Ref<Question[]> = ref([]);
  function addQuestion(question: Question) {
    questions.value.push(question);
  }
  // function completeSurvey() {

  //   sendSurvey({
  //     title: "test",
  //     description: "asddsad",
  //     owner: "asdsadsa",
  //     date: 213242,
  //     questions: {
  //       type: "asdsad",
  //       question: "asdsad",
  //       answers: ["asdsad", "asdsadsa"],
  //     },
  //   });
  // }
  function getSurvey() {
    console.log(surveyDetails.value.title);
    return {
      title: surveyDetails.value.title,
      description: surveyDetails.value.description,
      owner: localStorage.getItem("user-email"),
      date: Date.now(),
      questions: questions.value,
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
