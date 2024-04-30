<script setup>
import { ref, watch } from 'vue'
import IconArrow from '@/img/IconArrow.vue'
import state from './store.js'
import { ExtraData } from './extraData'
import { unitsObject } from './main'
import { main } from './main'
import { loadBG } from './background'

const timeseries = ref([])

function load(result) {
  if (result !== 'none') {
    timeseries.value = main(result, 'current').current
    loadBG(timeseries.value)
  }
}

watch(
  [state.data],
  () => {
    if (state.data.value.length !== 0) {
      load(state.data.value)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div
    class="current weather-container"
    :class="timeseries.icon ? '' : 'blur'"
    @click="ExtraData(timeseries, unitsObject)"
  >
    <img
      class="icon"
      :src="'./img/icons/weather/svg/' + timeseries.icon + '.svg'"
      :alt="'weather current ' + timeseries.icon"
      width="50px"
      height="50px"
    />
    <div class="temperature_container">
      <h2 class="temp">
        {{ timeseries ? timeseries.temperature : 'Loading... ' }}
        <p>{{ unitsObject.temperature }}</p>
      </h2>
      <h3 class="temp_feels_like">
        <div>
          <b>{{ timeseries ? timeseries.temperature_feels_like : 'Loading... ' }}</b>
          <p>{{ unitsObject.temperature }}</p>
        </div>
        <p class="info">Temperatura odczuwalna</p>
      </h3>
    </div>
    <b class="pressure">
      {{ timeseries ? timeseries.pressure : 'Loading... ' }}
      <p>{{ unitsObject.pressure }}</p>
    </b>
    <div class="precipitation">
      <b>{{ timeseries ? timeseries.precipitation + ' ' : 'Loading... ' }}</b>
      <p>{{ unitsObject.precipitation }}</p>
    </div>
    <div class="wind">
      <b>{{ timeseries && timeseries.wind ? timeseries.wind.speed + ' ' : 'Loading... ' }}</b>
      <p>{{ unitsObject.wind.speed }}</p>
      <IconArrow
        :style="{
          rotate:
            timeseries && timeseries.wind
              ? timeseries.wind.direction + unitsObject.wind.direction
              : '0deg'
        }"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
div.current {
  display: grid;
  grid-template: repeat(4, max-content) / 50% 50%;
  place-items: center;
  height: 100%;

  div.current > b {
    grid-row: 2/3;
  }
  & > * {
    display: ruby;
  }
  div,
  h2,
  b {
    display: flex;
  }
  * {
    text-align: center;
    place-self: center;
  }
  .temperature_container {
    display: flex;
    gap: 2em;
    .temp {
      display: flex;
    }
    .temp_feels_like {
      display: flex;
      flex-direction: column;
      p.info {
        font-size: 15px;
      }
    }
  }
  .pressure {
    grid-column: 1/3;
    grid-row: 4/4;
  }
  .precipitation {
    grid-column: 1/2;
    grid-row: 3/4;
    display: ruby;
  }
  .wind {
    grid-column: 2/3;
    grid-row: 3/3;
  }
}
</style>
./main.js./main.js
