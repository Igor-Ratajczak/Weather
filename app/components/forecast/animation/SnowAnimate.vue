<script setup lang="ts">
import snow from '/snow.webp';

defineProps<{
  item: WeatherForecast;
}>();
</script>
<template>
  <defs>
    <pattern
      :id="`snowAnimate${item.time.split(' ').join('')}`"
      x="0"
      y="0"
      width="100"
      height="200"
      patternUnits="userSpaceOnUse"
    >
      <image :href="snow" width="100" height="200"></image>
      <animate
        attributeType="XML"
        attributeName="y"
        calcMode="linear"
        values="0; 50; 100; 150; 200;"
        dur="3s"
        repeatCount="indefinite"
      ></animate>
    </pattern>
  </defs>
</template>

<style scoped lang="less"></style>
