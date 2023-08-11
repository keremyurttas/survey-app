<template>
  <div>
    <button class="esc-button" @click="emit('close')">ESC</button>
    <div v-for="answer in results.answers">
      <span>{{ answer.userOpinion }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  results: any;
}>();
const emit = defineEmits<{
  close: any;
}>();
console.log(props.results)
</script>
