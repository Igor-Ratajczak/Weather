<script setup lang="ts">
import rain from '/rain-1.webp';
import snow from '/snow-1.webp';

defineProps<{
  item: WeatherForecast;
}>();
</script>
<template>
  <defs>
    <pattern
      :id="`sleetAnimate${item.time.split(' ').join('')}`"
      x="0"
      y="0"
      width="100"
      height="200"
      patternUnits="userSpaceOnUse"
    >
      <!-- Deszcz -->
      <image class="rain" :href="rain" width="100" height="200" x="0" y="0"></image>
      <image class="rain2" :href="rain" width="100" height="200" x="0" y="-200"></image>

      <!-- Śnieg -->
      <image class="snow" :href="snow" width="100" height="200" x="0" y="0"></image>
      <image class="snow2" :href="snow" width="100" height="200" x="0" y="-200"></image>
    </pattern>
  </defs>
</template>

<style scoped lang="less">
.rain {
  animation: fall1 1s linear infinite;
}

.snow {
  animation: fall1 3s linear infinite;
}

.rain2 {
  animation: fall2 1s linear infinite;
}

.snow2 {
  animation: fall2 3s linear infinite;
}

@keyframes fall1 {
  0% {
    transform: translateY(-200px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes fall2 {
  0% {
    transform: translateY(200px);
  }
  100% {
    transform: translateY(400px);
  }
}
</style>
