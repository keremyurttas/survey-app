import { defineStore } from "pinia";

export const useGeneralStore = defineStore("generalStore", () => {
  const isLoginPopupVisible = ref(false);
  const loginStatus = ref(
    process.client && localStorage.getItem("user-email")?.trim().length > 0
      ? "Log-out"
      : "Log-in"
  );

  function changeVisibility() {
    isLoginPopupVisible.value = !isLoginPopupVisible.value;
  }

  return {
    isLoginPopupVisible,
    changeVisibility,
    loginStatus,
  };
});
