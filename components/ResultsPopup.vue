<template>
  <my-popup @close="$emit('close')">
    <!-- <button class="esc-button" @click="emit('close')">ESC</button> -->
    <user-opinion-popup
      v-if="isUserOpinionsActive"
      :questions="survey.questions"
      :results="userToShow"
      @close="isUserOpinionsActive = !isUserOpinionsActive"
    ></user-opinion-popup>
    <template #header>
      <h2 v-if="survey">{{ survey.title }}</h2>
    </template>

    <div class="py-10">
      <div v-if="survey" class="text-center">
        <div class="space-y-4">
          <h3 class="text-3xl text-center">Users</h3>
          <div v-for="(result, i) in resultsToShow" :key="result">
            <button
              class="text-xl text-start"
              @click="showUserOpinion(result.user)"
            >
              {{ i + 1 }}
              {{ result.user }}
            </button>
          </div>
        </div>
        <!-- <div class="w-1 bg-tertary"></div>
        <div class="space-y-4">
          <h3 class="text-3xl text-center">Questions</h3>

          <div v-for="(question, i) in survey.questions">
            <button class="text-xl text-start w-full">
              {{ i + 1 }}
              {{ question.question }}
            </button>
          </div>
        </div> -->
      </div>
    </div>

    <!-- Display other survey properties here -->

    <!-- <h2>{{ survey }}</h2>
    <h4>{{ survey.description }}</h4> -->
  </my-popup>
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
import { useFirebaseStore } from "~/store/firebase";
import { Result } from "types/store";
const firebaseStore = useFirebaseStore();
const { getResponsesById, getSurveyById } = firebaseStore;

const { assignResults } = useSurveyResults();
const { resultsToShow } = storeToRefs(useSurveyResults());
const survey = ref();
const isUserOpinionsActive = ref(false);
const userToShow = ref("");
function showUserOpinion(user: string) {
  userToShow.value = resultsToShow.value.find(
    (res: Result) => res.user == user
  );
  isUserOpinionsActive.value = true;
}

onMounted(async () => {
  let results = await getResponsesById(props.surveyId);
  assignResults(results);
  survey.value = await getSurveyById(props.surveyId);
  console.log(survey.value);
});
</script>
