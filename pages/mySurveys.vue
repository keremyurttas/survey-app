<template>
  <section class="container">hey</section>
</template>
<script setup lang="ts">
onMounted(() => {
  getSurveysByEmail(localStorage.getItem("user-email"));
});
</script>
