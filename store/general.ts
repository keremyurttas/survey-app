import { defineStore } from "pinia";

export const useGeneralStore = defineStore("generalStore", () => {
  const isLoginPopupVisible = ref(false);
  const loginStatus = ref("Log-in");

  function changeVisibility() {
    isLoginPopupVisible.value = !isLoginPopupVisible.value;
    console.log(isLoginPopupVisible.value);
  }
  function changeLoginStatus() {
    loginStatus.value == "Log-in"
      ? (loginStatus.value = "Log-out")
      : (loginStatus.value = "Log-in");
  }

  return {
    isLoginPopupVisible,
    changeVisibility,
    changeLoginStatus,
    loginStatus,
  };
});
