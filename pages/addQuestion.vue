<template>
  <section class="container">
    <question-type-selector
      @change="handleTypeChange"
      :options="answerOptions"
    ></question-type-selector>
  </section>
</template>
<script setup lang="ts">
const answerOptions: string[] = ["text", "multiple", "degree", "single"];
const activeOption: Ref<string> = ref("");
function handleTypeChange(e: string) {
  activeOption.value = e;
  alert(activeOption.value);
}
</script>
