<template>
  <section v-if="surveys && surveys?.length > 0" class="container">
    <transition name="slide-fade">
      <my-toast v-if="isToastVisible" @close="isToastVisible = false">
        Survey url copied to clipboard.
      </my-toast>
    </transition>
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
definePageMeta({
  middleware: ["auth"],
});
import { Survey } from "types/composables";
import { useFirebaseStore } from "~/store/firebase";
const firebaseStore = useFirebaseStore();
const { getSurveysByEmail, activeUser } = firebaseStore;
const surveys = ref<Survey[]>();
const isPopupVisible = ref(false);
const surveyIdForResults = ref("");
const isToastVisible = ref(false);

onMounted(async () => {
  if (activeUser) {
    surveys.value = await getSurveysByEmail(activeUser);
  }
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
  const domain = window.location.origin;
  navigator.clipboard
    .writeText(domain + "/displaySurvey/" + text)
    .then(() => {
      isToastVisible.value = true;
      setTimeout(() => {
        isToastVisible.value = false;
      }, 3000);
    })
    .catch((error) => {
      console.error("Failed to copy text: ", error);
    });
}
</script>
<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(40px);
  opacity: 0;
}
</style>
t
