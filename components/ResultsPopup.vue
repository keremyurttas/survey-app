<template>
  <section class="popup bg-quaternary container">
    <button class="esc-button" @click="emit('close')">ESC</button>
    <user-opinion-popup
      v-if="isUserOpinionsActive"
      :results="userToShow"
    ></user-opinion-popup>
    <div v-if="survey" class="space-y-2 text-center">
      <h2 class="text-4xl">{{ survey.title }}</h2>
      <h4 class="text-xl">{{ survey.description }}</h4>
      <h3 class="text-2xl">Users</h3>
      <div class="space-y-4">
        <div class="" v-for="question in resultsToShow">
          <button @click="showUserOpinion(question.user)">
            {{ question.user }}
          </button>
        </div>
      </div>
    </div>

    <!-- Display other survey properties here -->

    <!-- <h2>{{ survey }}</h2>
    <h4>{{ survey.description }}</h4> -->
  </section>
</template>
<script setup lang="ts">
const props = defineProps<{
  surveyId: string;
}>();
const emit = defineEmits<{
  close: any;
}>();
import { storeToRefs } from "pinia";
import { useSurveyResults } from "~/store/surveyResults";

const { assignResults } = useSurveyResults();
const { resultsToShow } = storeToRefs(useSurveyResults());
const survey = ref();
const isUserOpinionsActive = ref(false);
const userToShow = ref("");
function showUserOpinion(user: string) {
  userToShow.value = resultsToShow.value.find((res) => res.user == user);
  console.log(resultsToShow.value);
  console.log(userToShow.value);
  isUserOpinionsActive.value = true;
}

onMounted(async () => {
  let results = await getResponsesById(props.surveyId);
  assignResults(results);
  survey.value = await getSurveyById(props.surveyId);
});
</script>
