<script setup lang="ts">
defineProps<{ fill?: string }>();
</script>

<template>
  <svg class="favorite" width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path
      d="M 10,30
              A 20,20 0,0,1 50,30
              A 20,20 0,0,1 90,30
              Q 90,60 50,90
              Q 10,60 10,30 z"
      :fill="fill"
    />
  </svg>
</template>

<style scoped lang="less">
svg.favorite {
  cursor: pointer;
  stroke: light-dark(#000000ff, #ffffffff);
  stroke-width: 4px;
}
</style>
