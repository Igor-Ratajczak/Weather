<script setup lang="ts">
import { getURLVideo, type WeatherCondition } from '~/utils/getURLVideo';

const state = useAppConfig();

const loadBackgroundVideo = (icon: WeatherCondition) => {
  if (icon) {
    movie.value = getURLVideo(icon);
    video.value?.load();
  }
};
const video = useTemplateRef('video');
const movie = ref<string>('');

watch(
  () => state.weatherCurrent,
  (currentWeather: WeatherCurrentData | null) => {
    if (currentWeather) {
      const actualWeatherCondition = currentWeather.icon;
      loadBackgroundVideo(actualWeatherCondition as WeatherCondition);
    }
  }
);

onMounted(() => {
  if (state.weatherCurrent) {
    const actualWeatherCondition = state.weatherCurrent.icon;
    loadBackgroundVideo(actualWeatherCondition as WeatherCondition);
  }
});
</script>

<template>
  <div id="background-container">
    <video ref="video" id="video" autoplay loop muted>
      <source type="video/mp4" :src="movie" />
    </video>
  </div>
</template>

<style scoped lang="less">
#background-container {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  display: flex;
  place-items: center;

  video {
    object-fit: cover;
    width: 100vw;
    height: 100vh;
  }
}
</style>
