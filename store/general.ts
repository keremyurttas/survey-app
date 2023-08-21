import { defineStore } from "pinia";

export const useGeneralStore = defineStore("generalStore", () => {
  const isLoginPopupVisible = computed(() => {
    return useRoute().query.loginModal == "true" ? true : false;
  });
  const isLoading = ref(false);

  function changeVisibility() {
    const router = useRouter();
    console.log("asdsad");
    router.push({
      path: "",
      query: {
        loginModal: isLoginPopupVisible.value.toString()
          ? (!isLoginPopupVisible.value).toString()
          : "true",
      },
    });
  }

  return {
    isLoginPopupVisible,
    changeVisibility,
    isLoading,
  };
});
