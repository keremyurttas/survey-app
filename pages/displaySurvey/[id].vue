<template>
  <div class="container">
    <section v-if="activeIndex === -1 && hasLoaded == true" class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-4xl">{{ currentSurvey?.title }}</h2>
        <div class="flex justify-between text-secondary">
          <span>{{ currentSurvey?.owner }}</span>
          <span>{{ new Date(currentSurvey?.date).toLocaleDateString() }}</span>
        </div>
        <h4 class="text-2xl">{{ currentSurvey?.description }}</h4>
      </div>

      <div class="space-y-2">
        <h4 class="text-xl">Your email adress:</h4>
        <input
          placeholder="Enter email"
          @blur="validateEmail"
          v-model="userEmail"
          type="text"
          class="bg-quaternary p-2"
        />
        <span class="text-red-500" v-if="!isValidEmail"
          >Please type a correct email adress.</span
        >
      </div>
      <button
        @click="
          {
            isValidEmail ? activeIndex++ : undefined;
          }
        "
        class="text-2xl primary-button rounded-lg shadow-primary hover:shadow-secondary_hover hover:bg- secondary_hover"
      >
        Start
      </button>
    </section>
    <div class="p-4 lg:p-0" v-else>
      <span class="mb-4"
        >Question {{ activeIndex + 1 + "/ " + questions.length }}</span
      >
      <survey-question
        @answer-details="handleNextQuestion"
        :question-details="questionDetails"
      ></survey-question>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useDisplaySurvey } from "~/store/displaySurvey";
import { SurveyDetails, Answer, Result } from "~/types/store";
const { questions } = storeToRefs(useDisplaySurvey());
const { assignQuestions } = useDisplaySurvey();
const activeIndex = ref(-1);
const currentSurvey: Ref<SurveyDetails | null> = ref(null);
const hasLoaded = ref(false);
const userEmail = ref("");
const isValidEmail = ref(false);
const id: any = useRoute().params.id;
function validateEmail() {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  isValidEmail.value = emailRegex.test(userEmail.value);
}

const answers: Answer[] = [];
onMounted(async () => {
  const survey: SurveyDetails = await getSurveyById(id);
  currentSurvey.value = survey;
  assignQuestions(survey?.questions);
  hasLoaded.value = true;
});

const questionDetails = computed(() => {
  return questions.value[0]
    ? questions.value[activeIndex.value]
    : { question: "loading" };
});
function handleNextQuestion(answer: string) {
  answers.push({ questionCount: activeIndex.value + 1, userOpinion: answer });

  console.log(answers);
  if (activeIndex.value + 1 < questions.value.length) activeIndex.value++;
  else if (activeIndex.value + 1 == questions.value.length) {
    const result: Result = {
      surveyOwner: currentSurvey.value?.owner,
      surveyId: id,
      user: userEmail.value,
      date: Date.now(),
      answers: answers,
    };
    console.log(result);
    sendResult(result);
  }
}
</script>
