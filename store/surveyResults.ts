import { defineStore } from "pinia";
import { Result } from "types/store";

export const useSurveyResults = defineStore("surveyResults", () => {
  const resultsToShow = ref();
  const emails: Ref<string[]> = ref([]);
  function assignResults(results) {
    console.log(results);
    resultsToShow.value = results;

    resultsToShow.value.forEach((res) => {
      console.log(res);
      emails.value = res.user;
    });

    console.log("emails" + emails.value);
    console.log(resultsToShow.value);
  }

  return { resultsToShow, assignResults };
});
