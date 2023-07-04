<template>
  <section class="container gap-20 p-5">
    <question-type-selector
      @change:any="handleTypeChange"
      :options="answerOptions"
    ></question-type-selector>
    <question-add></question-add>
  </section>
</template>
<script setup lang="ts">
const answerOptions: string[] = ["text", "multiple", "degree", "single"];
const activeOption: Ref<string> = ref("");
function handleTypeChange(e: string) {
  activeOption.value = e;
}
</script>
