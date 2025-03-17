<template>
  <NuxtPwaManifest />
  <button class="toggleWeather" @click="toggleWeather = !toggleWeather">
    {{ toggleWeather ? 'Pokaż pogodę' : 'Ukryj pogodę' }}
  </button>
  <BackgroundVideo />
  <div class="root" :class="[weatherState.theme, toggleWeather ? 'hide' : null]" :style="'--scrollbar-color:' + scrollBarColor">
    <div class="main-container">
      <AppHeader />
      <ForecastWeatherCurrent />
    </div>
    <ForecastWeatherFuture />
    <ForecastWeatherExtraData />
    <AppFooter />
  </div>
  <PWAPrompt />
</template>

<script setup lang="ts">
import tzlookup from 'tz-lookup';

const state = useAppConfig();
const weatherState = useWeatherState().value;

const toggleWeather = ref(false);
let scrollBarColor = ref('#FFFFFF82');

const initializeWeather = async () => {
  weatherState.weather = await getWeatherAPI(weatherState.city);
  if (navigator.onLine) {
    const timeZone = tzlookup(weatherState.city.latitude, weatherState.city.longitude);
    if (timeZone) weatherState.city.timeZone = timeZone;
  }

  const weathers = formatWeatherTimeseries(weatherState.weather.properties.timeseries);
  let next2weeks = new Date();
  next2weeks.setDate(next2weeks.getDate() + 14);
  const index = getWeatherIndex(weathers);
  const relevantWeather = weathers.slice(index);
  getWeatherCurrent(relevantWeather[0] || weathers[0]!);
  getWeatherForecast(relevantWeather);
  scrollBarColor.value = getColor(state.weatherCurrent?.temperature);

  function updateIndex() {
    updateWeatherIndex(weathers, scrollBarColor);
  }

  updateIndex();
  setInterval(updateIndex, 60 * 1000);
};

onMounted(() => {
  initializeWeather();
  const weatherInterval = setInterval(initializeWeather, 6 * 60 * 60 * 1000);

  window.addEventListener('online', initializeWeather);

  onUnmounted(() => {
    clearInterval(weatherInterval);
    window.removeEventListener('online', initializeWeather);
  });
});

watch(weatherState.city, () => {
  initializeWeather();
});
</script>

<style lang="less">
@import url('./assets/style.less');

button.toggleWeather {
  width: 10em;
  height: 2em;
  background: var(--color-background);
  color: var(--color-text);
  border-radius: 25px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
  margin: 10px;
  cursor: pointer;

  @media screen and (min-width: 1500px) {
    position: fixed;
  }
}

.root {
  display: grid;
  grid-template: 'main-container' 'forecast' 'footer';
  gap: 8em;
  justify-items: center;
  --scrollbar-color: white;
  --scrollbar-background: #ffffff82;
  scrollbar-color: var(--scrollbar-color) var(--scrollbar-background);
  scrollbar-width: thin;
  position: relative;
  left: 0;
  transition: left 1s ease-in-out;

  &.hide {
    left: -100%;
  }

  @media screen and (min-width: 1500px) {
    grid-template:
      'main-container forecast'
      'main-container forecast'
      'space forecast'
      'footer footer';
    grid-template-columns: 45% 55%;
    gap: 0;
  }

  .main-container {
    grid-area: main-container;
    display: grid;
    grid-template:
      'header'
      'current';
    gap: 2em;
    width: 100%;
    justify-items: center;

    @media screen and (min-width: 1500px) {
      position: sticky;
      top: 40px;
    }
  }
}
</style>
