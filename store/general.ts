import { defineStore } from "pinia";

export const useGeneralStore = defineStore("generalStore", () => {
  const isLoginPopupVisible = ref(false);
  const isLoading = ref(false);

  function changeVisibility() {
    isLoginPopupVisible.value = !isLoginPopupVisible.value;
  }

  return {
    isLoginPopupVisible,
    changeVisibility,
    isLoading,
  };
});
