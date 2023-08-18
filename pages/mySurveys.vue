<template>
  <section v-if="surveys && surveys?.length > 0" class="container">
    <results-popup
      v-if="isPopupVisible"
      @close="closePopup"
      :survey-id="surveyIdForResults"
    ></results-popup>
    <ul v-for="(survey, i) in surveys" :key="i" class="">
      <li
        @click="showSurveyResults(survey.id)"
        class="md:flex justify-between items-center cursor-pointer break-all"
      >
        <div class="mb-4">
          <h2 class="text-4xl mr-4">{{ survey.title }}</h2>
          <div>
            <h5 class="">{{ survey.description }}</h5>
          </div>
        </div>

        <div class="flex gap-4 justify-between">
          <button
            @click.stop="copyTheSurveyUrl(survey.id)"
            type="button"
            class="text-white bg-blue-700 w-max hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-1 px-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get the survey URL
          </button>
          <div>
            <span class="inline-block w-max">{{
              formatTheDate(survey.date)
            }}</span>
          </div>
        </div>
      </li>
      <hr class="bg-primary h-2 w-full" />
    </ul>
  </section>
  <section class="text-center py-60" v-else>
    <span class="md:text-3xl">You haven't created any survey yet! </span>
  </section>
</template>
<script setup lang="ts">
import { Survey } from "types/composables";
import { useFirebaseStore } from "~/store/firebase";
const firebaseStore = useFirebaseStore();
const { getSurveysByEmail } = firebaseStore;
const surveys = ref<Survey[]>();
const isPopupVisible = ref(false);
const surveyIdForResults = ref("");

onMounted(async () => {
  const userEmail = localStorage.getItem("user-email");
  if (userEmail) {
    surveys.value = await getSurveysByEmail(userEmail);
  }
  console.log(surveys.value);
});
function showSurveyResults(id: string) {
  surveyIdForResults.value = id;
  isPopupVisible.value = true;
}
function closePopup() {
  isPopupVisible.value = false;
}
function formatTheDate(surveyDate: number) {
  const date = new Date(surveyDate);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function copyTheSurveyUrl(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Text copied to clipboard");
    })
    .catch((error) => {
      console.error("Failed to copy text: ", error);
    });
}
</script>
