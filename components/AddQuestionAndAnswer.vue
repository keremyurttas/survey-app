<template>
  <section class="space-y-8 container relative pb-16">
    <div class="flex justify-between w-full text-3xl">
      <div
        v-for="(option, index) in optionsList"
        :key="index"
        class="flex flex-col items-center gap-2 lg:gap-4"
      >
        <label class="lg:text-3xl text-lg capitalize" :for="option">{{
          option
        }}</label>
        <input
          v-model="activeOptionType"
          class="text-gray-300 w-min checked:shadow-primary_hover_circle"
          type="radio"
          name="answer_type"
          ref="test"
          :value="option"
          :id="option"
          @input="changeOption(index)"
        />
      </div>
    </div>
    <textarea
      class="text-4xl border p-4"
      name=""
      id=""
      cols="10"
      rows="1"
      placeholder="Your Question"
      v-model="question"
    />

    <section v-if="doesNeedAnAnswer">
      <div class="space-y-3">
        <div
          class="space-y-2"
          v-for="(input, index) in answers.length + 1"
          :key="index"
        >
          <div
            class="flex justify-between p-2 bg-quaternary"
            :class="{
              hidden: index < activeIndex,
            }"
          >
            <input
              class="text-2xl text-white placeholder:text-white"
              type="text"
              placeholder="Write answer option."
              v-model="activeVal"
              id="activeInput"
            />
            <button class="" @click="handleDeleteOption">
              <img src="../assets/images/up_arrow.svg" alt="" />
            </button>
          </div>
          <span
            :class="{
              hidden: index >= activeIndex,
            }"
            class="text-2xl px-2 flex items-center border-t border-b py-2"
            >{{ answers[index] }}</span
          >
        </div>

        <button
          @click="handleAddAnswer"
          class="primary-button md:w-min text-2xl md:text-base float-right"
        >
          +
        </button>
      </div>
    </section>
    <div class="flex justify-between">
      <button @click="sendSurveyToStore" class="primary-button shadow-none">
        Complete the survey
      </button>

      <button
        @click="handleNextQuestion"
        class="capitalize primary-button bg-quaternary shadow-none border hover:scale-110"
      >
        next question
      </button>
    </div>
  </section>
</template>
<script setup lang="ts">
const QuestionStudioStore = useQuestionStudioStore();
const { changeOption } = QuestionStudioStore;
const { optionsList } = storeToRefs(QuestionStudioStore);
import { storeToRefs } from "pinia";
import { useQuestionStudioStore } from "~/store/questionStudio";
import { useFirebaseStore } from "~/store/firebase";
const firebaseStore = useFirebaseStore();
const { sendSurvey } = firebaseStore;

const answers: Ref<string[]> = ref([]);
const activeIndex = ref(0);
const activeVal: Ref<string> = ref("");
const question: Ref<string> = ref("");

const questionStudioStore = useQuestionStudioStore();
const { addQuestion, getSurvey } = questionStudioStore;
const { activeOptionType } = storeToRefs(questionStudioStore);
const doesNeedAnAnswer = computed(() => {
  return activeOptionType.value == "multiple" ||
    activeOptionType.value == "single"
    ? true
    : false;
});

function handleAddAnswer() {
  if (activeVal.value.trim() !== "") {
    activeIndex.value++;
    answers.value.push(activeVal.value);
    activeVal.value = "";
  }
}
function handleDeleteOption() {
  if (activeIndex.value > 0) {
    activeIndex.value--;
    let poppedVal = answers.value.pop();
    if (poppedVal !== undefined) {
      activeVal.value = poppedVal;
    }
  }
}

function handleNextQuestion() {
  if (doesNeedAnAnswer.value && activeVal.value.trim() !== "") {
    answers.value.push(activeVal.value);
  }
  if (question.value.trim() == "") {
    alert("You should type question");
  } else if (doesNeedAnAnswer.value == true && answers.value.length == 0) {
    alert("You should add answers");
  } else {
    addQuestion({
      type: activeOptionType.value,
      question: question.value,
      answers: answers.value,
    });
    resetForNewQuesiton();
  }
}
function resetForNewQuesiton() {
  activeOptionType.value = "single";
  question.value = "";
  answers.value = [];
  activeIndex.value = 0;
  activeVal.value = "";
}

function sendSurveyToStore() {
  if (getSurvey().questions.length > 0) {
    let res = confirm("Do you want to complete the survey?");
    if (res) {
      if (question.value.trim() !== "") {
        let unfinishedQuestion = confirm(
          "There is a question that you didn't send. Do you want to complete anyway?"
        );
        if (unfinishedQuestion) {
          sendSurvey(getSurvey());
          useRouter().push("/");
        }
      } else {
        sendSurvey(getSurvey());
        useRouter().push("/");
      }
    }
  } else {
    alert("Please at least add one question to complete the survey.");
  }
}
</script>
