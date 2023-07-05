import { defineStore } from "pinia";

export const useOptionsStore = defineStore("optionStore", () => {
  const optionsList = ref(["single", "multiple", "text", "degree", "yes / no"]);
  const activeOptionType = ref("single");

  function changeOption(index: any) {
    activeOptionType.value = optionsList.value[index];
  }
  return { changeOption, activeOptionType, optionsList };
});
