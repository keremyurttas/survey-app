<template>
  <div
    id="defaultModal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center backdrop-blur-sm"
  >
    <div class="relative w-full max-w-2xl max-h-full">
      <div class="relative rounded-lg shadow bg-gray-700 px-2">
        <div
          class="flex items-start justify-between p-4 border-b rounded-t border-gray-600"
        >
          <h3 class="text-3xl font-semibold text-white break-all capitalize">
            <slot name="header"></slot>
          </h3>
          <button
            @click="emit('close')"
            type="button"
            class="text-gray-400 bg-transparent p-2 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600"
            data-modal-hide="defaultModal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="px-4 break-all">
          <slot></slot>
        </div>

        <!-- Modal footer -->
        <div
          v-if="footer"
          class="flex items-center p-6 space-x-2 border-t rounded-b border-gray-600"
        >
          <button
            @click="emit('close')"
            data-modal-hide="defaultModal"
            type="button"
            class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  close: any;
}>();
const props = defineProps({
  footer: Boolean, // Prop type remains Boolean
});
</script>
