<script setup>
import { ref, watch } from 'vue'
import IconArrow from '@/img/IconArrow.vue'
import state from './store.js'
import { ExtraData } from './extraData.js'
import { unitsObject } from './main'
import { main } from './main'

const timeseries = ref([])
const short = ref([])
const forecast = ref([])

function load(result) {
  if (result !== 'none') {
    timeseries.value = main(result, 'forecast').forecast
    short.value = timeseries.value.shortWeather
    forecast.value = timeseries.value.forecast
  }
}

watch(
  [state.lat, state.lon],
  () => {
    if (state.lat.value && state.lon.value && state.data.value.length !== 0) {
      load(state.data.value)
    }
  },
  { immediate: true }
)
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
  <div class="forecast">
    <div class="list-symbol weather-container">
      <b>noc</b>
      <b>rano</b>
      <b>południe</b>
      <b>wieczór</b>
    </div>
    <div class="weather-container" :class="timeseries ? '' : 'blur'">
      <div v-for="(item, index) in short" :key="item.shortWeather">
        <details
          v-if="item.temperature_max !== 'undefined' && item.temperature_min !== 'undefined'"
          class="day"
        >
          <summary
            v-if="item?.temperature_max && item?.temperature_min !== 'undefined'"
            class="summary-container"
          >
            <h2 class="time">{{ item.time }}</h2>
            <div class="temperature">
              <b>{{
                item.temperature_max +
                unitsObject.temperature +
                ' / ' +
                item.temperature_min +
                unitsObject.temperature
              }}</b>
            </div>
            <div class="precipitation">
              <b>{{
                item.precipitation_max +
                unitsObject.precipitation +
                ' / ' +
                item.precipitation_min +
                unitsObject.precipitation
              }}</b>
            </div>
            <div class="summary">
              <div v-for="(icon, time) in item.icon" :key="time">
                <div v-if="icon !== undefined" :class="time">
                  <img
                    v-if="icon"
                    :src="'./img/icons/weather/svg/' + icon + '.svg'"
                    :alt="'weather current ' + icon"
                    width="50px"
                    height="50px"
                  />
                  <div class="precipitation">
                    <b v-if="item.precipitation">{{ item.precipitation[time] }}</b>
                    <p v-if="item.precipitation">{{ unitsObject.precipitation }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="more-details"><p>Więcej danych.</p></div>
          </summary>
          <div
            v-for="forecast_data in forecast[index]"
            :key="forecast_data"
            class="day_forecast"
            @click="ExtraData(forecast_data, unitsObject)"
          >
            <div v-if="forecast_data.icon !== 'none'">
              <img
                :src="'./img/icons/weather/svg/' + forecast_data.icon + '.svg'"
                :alt="'weather current ' + forecast_data.icon"
                width="50px"
                height="50px"
              />
              <div class="time">
                <b class="hour">{{ forecast_data.time.split('T', 7)[1].slice(0, -1) }}</b>
              </div>
              <h3 class="temp">
                <b>{{ forecast_data ? forecast_data.temperature : 'Loading...' }}</b>
                <p>{{ unitsObject.temperature }}</p>
              </h3>
              <div class="pressure">
                <b>{{ forecast_data ? forecast_data.pressure : 'Loading...' }}</b>
                <p>{{ unitsObject.pressure }}</p>
              </div>
              <div class="precipitation">
                <b>{{ forecast_data ? forecast_data.precipitation : 'Loading...' }}</b>
                <p>{{ unitsObject.precipitation }}</p>
              </div>
              <div class="wind">
                <b>
                  {{
                    forecast_data && forecast_data.wind ? forecast_data.wind.speed : 'Loading...'
                  }}
                </b>
                <p>{{ unitsObject.wind.speed }}</p>
                <IconArrow
                  :style="{
                    rotate:
                      forecast_data && forecast_data.wind
                        ? forecast_data.wind.direction + unitsObject.wind.direction
                        : '0deg'
                  }"
                />
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
div.forecast {
  min-height: 50em;
  margin-bottom: 2em;
  display: grid;
}
div.list-symbol {
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  left: 0;
  padding: 0;
  filter: opacity(1);
  z-index: 100;
  @media screen and (min-width: 768px) {
    & {
      gap: 4em;
    }
  }
  > b {
    width: 100px;
    text-align: center;
  }
}
.summary-container {
  min-height: 5em;
  position: relative;
  display: grid;
  grid-template: 20% 20% 40% 20% / 50% 50%;
  gap: 1em 0;
  margin-bottom: 70px;
  .time {
    text-align: center;
    grid-column: 1/3;
    grid-row: 1/1;
  }
  > .temperature {
    text-align: center;
    grid-row: 2/2;
    grid-column: 1/2;
    margin-right: 10px;
    @media screen and (min-width: 768px) {
      & {
        text-align: end;
        margin-right: 50px;
      }
    }
  }
  > .precipitation {
    text-align: center;
    grid-row: 2/2;
    grid-column: 2/3;
    margin-left: 10px;
    @media screen and (min-width: 768px) {
      & {
        text-align: start;
        margin-left: 50px;
      }
    }
  }
  > .more-details {
    grid-column: 1/3;
    grid-row: 4/4;
    text-align: center;
  }
  div.summary {
    grid-column: 1/3;
    grid-row: 3/3;
    display: flex;
    justify-content: center;
    height: max-content;
    @media screen and (min-width: 768px) {
      & {
        gap: 4em;
      }
    }
    div {
      width: 100px;
      text-align: center;
      justify-content: center;
      height: max-content;
    }
    .precipitation {
      display: flex;
    }
  }
}

.summary-day {
  display: grid;
  grid-template: 1fr 3fr / 50% 50%;
  position: absolute;
  top: 0;
  width: 100%;
  justify-items: center;

  .day {
    grid-column: 1/3;
    grid-row: 1/2;
  }
  .icon-container {
    display: flex;
    grid-column: 1 / 3;
    grid-row: 2 / 3;
    justify-content: space-between;
    width: 100%;
  }
}
div.hours_details {
  display: none;
}
div.day_forecast {
  > div {
    display: grid;
    grid-template: repeat(4, max-content) / 50% 50%;
    justify-content: space-between;
    border-bottom: 2px solid var(--color-text);
    height: 100%;
    padding: 1em 0 1em 0;
    cursor: pointer;
    position: relative;

    * {
      text-align: center;
      display: ruby;
      place-self: center;
    }
    div.time {
      text-align: center;
      grid-column: 1/3;
      grid-row: 1/2;
      display: flex;
      gap: 2em;
    }
    div.time > b.hour {
      font-size: x-large;
    }
    .pressure {
      grid-column: 1/3;
      grid-row: 4/4;
    }
    .precipitation {
      grid-column: 1/2;
      grid-row: 3/4;
    }
    .wind {
      grid-column: 2/3;
      grid-row: 3/3;
    }
  }
}
div.grid {
  display: grid;
}
.blur {
  filter: blur(10px);
}
</style>
