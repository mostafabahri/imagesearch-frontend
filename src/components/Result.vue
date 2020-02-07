<template>
  <div>
    <h1 class="text-xl">Result Page</h1>
    <div class="">
      {{ result }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    result: String
  }
};
</script>

<style>
</style>