<template>
  <section class="space-y-8 container relative pb-16">
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
        <div class="space-y-2" v-for="(input, index) in answers.length + 1">
          <hr />
          <div
            class="flex justify-between px-2"
            :class="{
              hidden: index < activeIndex,
            }"
          >
            <input
              class="text-2xl"
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
            class="text-2xl px-2 flex items-center"
            >{{ answers[index] }}</span
          >
          <hr />
        </div>

        <button
          @click="handleAddAnswer"
          class="primary-button w-min float-right"
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
import { storeToRefs } from "pinia";
import { useQuestionStudioStore } from "~/store/questionStudio";
import { useFirebaseStore } from "store/firebase";
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
    answers.value.pop();
    console.log(answers.value);
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
  }

  resetForNewQuesiton();
}
function resetForNewQuesiton() {
  activeOptionType.value = "single";
  question.value = "";
  answers.value = [];
  activeIndex.value = 0;
  activeVal.value = "";
}

function sendSurveyToStore() {
  let res = confirm("Do you want to complete the survey?");
  if (res) {
    sendSurvey(getSurvey());
    useRouter().push("/");
  }
}
// const isInputFocused = ref(false);
// function addFocusListener() {
//   document
//     .getElementById("activeInput")
//     ?.addEventListener("focus", handleFocus);
// }
// onMounted(() => {
//     addFocusListener()
//   document.getElementById("activeInput")?.addEventListener("blur", handleBlur);
//   window.addEventListener("keypress", (e) => {
//     if (isInputFocused.value) {
//       if (e.key == "Enter") {
//         handleAddAnswer();
//         addFocusListener();
//       }
//       if (e.key == "Delete") {
//         handleDeleteOption();
//         addFocusListener();
//       }
//     }
//   });
// });
// function handleFocus() {
//   isInputFocused.value = true;
//   console.log("focus");
// }
// function handleBlur() {
//   isInputFocused.value = false;
//   console.log("blur");
// }
</script>
