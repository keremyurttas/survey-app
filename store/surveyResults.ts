import { defineStore } from "pinia";
import { Result } from "interfaces/general";

export const useSurveyResults = defineStore("surveyResults", () => {
  const resultsToShow = ref();
  const emails = ref();
  function assignResults(results: Result[]) {
    resultsToShow.value = results;

    resultsToShow.value.forEach((res: Result) => {
      emails.value = res.user;
    });
  }

  return { resultsToShow, assignResults };
});
