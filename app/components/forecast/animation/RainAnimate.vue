<script setup lang="ts">
import rain from '/rain-1.webp';

defineProps<{
  item: WeatherForecast;
}>();
</script>

<template>
  <defs>
    <pattern
      :id="`rainAnimate${item.time.split(' ').join('')}`"
      x="0"
      y="0"
      width="100"
      height="200"
      patternUnits="userSpaceOnUse"
    >
      <image :href="rain" width="100" height="200"></image>
      <animate
        attributeType="XML"
        attributeName="y"
        calcMode="linear"
        values="0; 50; 100; 150; 200;"
        dur="1s"
        repeatCount="indefinite"
      ></animate>
    </pattern>
  </defs>
</template>
