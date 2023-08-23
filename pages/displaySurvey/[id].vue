<template>
  <div class="container">
    <section
      v-if="currentSurvey !== undefined && activeIndex == -1"
      class="space-y-8"
    >
      <div class="space-y-4">
        <h2 class="text-4xl truncate">{{ currentSurvey?.title }}</h2>
        <div class="flex justify-between text-secondary">
          <span>Created by: {{ currentSurvey?.owner }}</span>
          <span>{{ new Date(currentSurvey.date).toLocaleDateString() }}</span>
        </div>
        <p class="text-2xl break-words">{{ currentSurvey?.description }}</p>
      </div>

      <form onsubmit="return false" class="space-y-6">
        <div v-if="!activeUser" class="space-y-2">
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
      </form>
    </section>
    <section v-else-if="currentSurvey !== undefined && activeIndex !== -1">
      <div class="p-4 lg:p-0">
        <span class="mb-4"
          >Question {{ activeIndex + 1 + "/ " + questions.length }}</span
        >
        <survey-question
          @answer-details="handleNextQuestion"
          :question-details="questionDetails"
        ></survey-question>
      </div>
    </section>
    <section class="text-center py-60" v-else>
      <span class="md:text-3xl">There is no Survey with the id: {{ id }} </span>
    </section>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFirebaseStore } from "~/store/firebase";
const firebaseStore = useFirebaseStore();
const { getSurveyById, sendResult } = firebaseStore;
const { activeUser } = storeToRefs(firebaseStore);
import { useDisplaySurvey } from "~/store/displaySurvey";
import { SurveyDetails, Answer, Result } from "~/interfaces/general";
const { questions } = storeToRefs(useDisplaySurvey());
const { assignQuestions } = useDisplaySurvey();
const activeIndex = ref(-1);
const currentSurvey = ref<SurveyDetails>();

const userEmail = ref("");
const isValidEmail = ref(activeUser ? true : false);
const id: any = useRoute().params.id;
function validateEmail() {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  isValidEmail.value = emailRegex.test(userEmail.value);
}

const answers: Answer[] = [];
onMounted(async () => {
  const survey: SurveyDetails | undefined = await getSurveyById(id);
  currentSurvey.value = survey;
  if (survey?.questions != undefined) {
    assignQuestions(survey.questions);
  }
});

const questionDetails = computed(() => {
  return questions.value[activeIndex.value];
});
function handleNextQuestion(answer: string | string[]) {
  answers.push({ questionCount: activeIndex.value + 1, userOpinion: answer });

  if (activeIndex.value + 1 < questions.value.length) activeIndex.value++;
  else if (
    activeIndex.value + 1 == questions.value.length &&
    currentSurvey.value != undefined
  ) {
    const result: Result = {
      surveyOwner: currentSurvey.value.owner,
      surveyId: id,
      user: activeUser.value || userEmail.value,
      date: Date.now(),
      answers: answers,
    };
    sendResult(result);
    alert("You have completed all questions.");
    useRouter().push("/");
  }
}
</script>
types/general
