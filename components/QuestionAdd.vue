<template>
  <section class="space-y-8">
    <textarea
      class="text-4xl border p-4"
      name=""
      id=""
      cols="10"
      rows="1"
      placeholder="Your Question"
    />

    <section
      v-if="activeOptionType == 'multiple' || activeOptionType == 'single'"
    >
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
        <div class="float-right flex flex-col gap-8">
          <button @click="handleAddAnswer" class="primary-button w-min">
            +
          </button>
          <button
            class="capitalize primary-button bg-quaternary shadow-none border hover:scale-110"
          >
            next question
          </button>
        </div>
      </div>
    </section>
  </section>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useOptionsStore } from "~/store/questionTypes";

const answers: Ref<string[]> = ref([]);
const activeIndex = ref(0);
const activeVal: Ref<string> = ref("");

const optionStore = useOptionsStore();
const { activeOptionType } = storeToRefs(optionStore);

// const isInputFocused = ref(false);
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
