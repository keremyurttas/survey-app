<template>
  <section class="container gap-10 px-5">
    <div class="text-white text-2xl flex justify-between mb-10">
      <div>
        <span>Question </span>
        <total-questions class="inline"></total-questions>
      </div>
      <button class="underline">All Questions</button>
    </div>
    <question-type-selector class=""></question-type-selector>
    <add-question-and-answer></add-question-and-answer>
  </section>
</template>
<script setup lang="ts"></script>
