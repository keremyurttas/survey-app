<template>
  <div class="flex justify-between w-full  text-3xl">
    <div
      v-for="(option, index) in options"
      :key="index"
      class="flex flex-col items-center gap-2 lg:gap-4"
    >
      <label class="lg:text-4xl text-lg capitalize" :for="option">{{
        option
      }}</label>
      <input
        v-model="activeOption"
        class="text-gray-300 w-min checked:shadow-primary_hover_circle"
        type="radio"
        name="answer_type"
        ref="test"
        :value="option"
        :id="option"
        @input="$emit('change', activeOption)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  options: string[];
}>();
defineEmits<{
  (name: "change"): void;
}>();
const activeOption: Ref<string> = ref("");
</script>
