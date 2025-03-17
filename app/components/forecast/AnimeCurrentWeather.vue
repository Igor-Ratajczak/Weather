<script setup lang="ts">
defineProps<{
  weather: WeatherCurrentData;
}>();

const styleIcicle = (randomPosition: number, randomWidth: number, randomHeight: number) => {
  return {
    right: Math.floor(randomPosition * 90) + '%',
    width: Math.floor(randomWidth * (30 - 20) + 20) + 'px',
    height: Math.floor(randomHeight * (120 - 70) + 70) + 'px',
    '--height_anime_icicle': Math.floor(randomHeight * (120 - 70) + 70) + 'px',
  };
};
</script>

<template>
  <div
    class="icicle-wrapper"
    v-if="weather.temperature < 0"
    v-for="i in Math.floor(Math.random() * (25 - 10) + 10)"
    :style="styleIcicle(Math.random(), Math.random(), Math.random())"
  >
    <div class="icicle"></div>
  </div>
</template>

<style scoped lang="less">
@import url('assets/anime.less');

.icicle-wrapper {
  position: absolute;
  bottom: 0;
}
</style>
