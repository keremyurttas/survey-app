<template>
  <section class="container flex-col lg:justify-normal lg:gap-20 h-[80vh] justify-between py-10 px-2 lg:p-0">
    <div class="space-y-3">
      <span class="block opacity-70">The title for your survey</span>
      <input
        type="text"
        placeholder="Title"
        class="text-4xl placeholder:text-white"
      />
    </div>
    <div class="bg-quaternary p-4 space-y-3 rounded-md">
      <h4 class="text-2xl">Description</h4>
      <textarea
        type="text"
        placeholder="Use this component to write your description"
      />
    </div>

    <div class="flex justify-end">
      <button
        class="w-min primary-button bg-slate-500 hover:bg-slate-600 hover:shadow-primary_hover"
      >
        Continue
      </button>
    </div>
  </section>
</template>
