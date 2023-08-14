<template>
  <section class="container">
    <results-popup
      v-if="isPopupVisible"
      @close="closePopup"
      :survey-id="surveyIdForResults"
      class=""
    ></results-popup>
    <ul v-for="(survey, i) in surveys" :key="i" class="">
      <li
        @click="showSurveyResults(survey.id)"
        class="flex justify-between items-center overflow-auto"
      >
        <div class="mb-4">
          <h2 class="text-4xl">{{ survey.title }}</h2>
          <h5 class="">{{ survey.description }}</h5>
        </div>

        <div>
          <span>{{ new Date(survey.date).toLocaleString() }}</span>
        </div>
      </li>
      <hr class="bg-primary h-2 w-full" />
    </ul>
  </section>
</template>
<script setup lang="ts">
import { Survey } from "types/composables";
import { useFirebaseStore } from "store/firebase";
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
});
function showSurveyResults(id: string) {
  surveyIdForResults.value = id;
  isPopupVisible.value = true;
}
function closePopup() {
  isPopupVisible.value = false;
}
</script>
