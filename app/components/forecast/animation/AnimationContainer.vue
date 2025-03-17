<script setup lang="ts">
const props = defineProps<{
  item: WeatherForecast;
  animate: string;
}>();
const graph = new Graph(props.item.hours);
</script>

<template>
  <defs v-if="animate === 'rain' || animate === 'snow'">
    <pattern
      :id="`${animate}Animate${new Date(item.time).getTime()}`"
      x="0"
      y="0"
      width="110"
      height="500"
      patternUnits="userSpaceOnUse"
    >
      <image :href="`/_nuxt/assets/${animate}.webp`" width="130" height="500"></image>
      <animate
        attributeType="XML"
        attributeName="y"
        calcMode="linear"
        values="0; 50; 100; 150; 200; 250; 300; 350; 400; 450; 500;"
        :dur="animate === 'rain' ? '1s' : '4s'"
        repeatCount="indefinite"
      ></animate>
    </pattern>
  </defs>
  <defs v-if="animate === 'sleet'">
    <pattern
      :id="`rainAnimate${new Date(props.item.time).getTime()}`"
      x="0"
      y="0"
      width="110"
      height="500"
      patternUnits="userSpaceOnUse"
    >
      <!-- Deszcz -->
      <image class="rain" :href="'/_nuxt/assets/rain.webp'" width="130" height="500" x="0" y="0"></image>
      <image class="rain2" :href="'/_nuxt/assets/rain.webp'" width="130" height="500" x="0" y="-500"></image>

      <!-- Śnieg -->
      <image class="snow" :href="'/_nuxt/assets/snow.webp'" width="130" height="500" x="0" y="0"></image>
      <image class="snow2" :href="'/_nuxt/assets/snow.webp'" width="130" height="500" x="0" y="-500"></image>
    </pattern>
  </defs>
  <defs>
    <linearGradient :id="`dynamicGradient_${new Date(props.item.time).getTime()}`" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop
        v-for="(hour, i) in props.item.hours"
        :key="i"
        :offset="graph.getOffset(i)"
        :stop-color="getColor(hour.temperature)"
      />
    </linearGradient>
  </defs>
</template>

<style scoped lang="less">
.rain {
  animation: rain-fall1 2s linear infinite;
}

.snow {
  animation: snow-fall1 6s linear infinite;
}

.rain2 {
  animation: rain-fall2 2s linear infinite;
}

.snow2 {
  animation: snow-fall2 6s linear infinite;
}

@keyframes rain-fall1 {
  0% {
    transform: translateY(-500px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes rain-fall2 {
  0% {
    transform: translateY(500px);
  }
  100% {
    transform: translateY(1000px);
  }
}

@keyframes snow-fall1 {
  0% {
    transform: translateY(-500px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes snow-fall2 {
  0% {
    transform: translateY(500px);
  }
  100% {
    transform: translateY(1000px);
  }
}
</style>
