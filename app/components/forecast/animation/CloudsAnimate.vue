<script setup lang="ts">
import clouds from '/cloud.webp';

defineProps<{
  item: WeatherForecast;
  width: number;
}>();
</script>

<template>
  <defs>
    <pattern
      :id="`cloudsAnimate${item.time.split(' ').join('')}`"
      x="0"
      y="0"
      :width="width"
      height="50"
      patternUnits="userSpaceOnUse"
    >
      <image class="cloud" :href="clouds" width="100" height="50"></image>
    </pattern>
  </defs>
</template>
