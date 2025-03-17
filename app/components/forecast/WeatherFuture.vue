<script setup lang="ts">
import { svgIcons } from '~/utils/getURLWeatherIcons';

const state = useAppConfig();
const units: WeatherUnits = state.weatherUnits;

const timeseries = ref<WeatherForecast[]>();

function checkIsIcon(item: WeatherForecast): boolean {
  return item.hours.every((hour) => {
    return hour.icon !== undefined;
  });
}

watch(
  () => state.weatherForecast,
  (newWeather) => {
    if (!newWeather) return;
    timeseries.value = newWeather;
  }
);
</script>

<template>
  <div class="forecast">
    <div class="list-symbol container">
      <b>noc</b>
      <b>rano</b>
      <b>południe</b>
      <b>wieczór</b>
    </div>
    <div v-if="timeseries !== undefined && timeseries.length > 0" class="container" :class="timeseries ? '' : 'blur'">
      <div v-for="(item, index) in timeseries" :key="index">
        <div class="daily-weather" v-if="checkIsIcon(item)">
          <div class="icons">
            <div v-for="icon in item.icon" :key="icon.time" class="icon" :data-time="icon.time">
              <img :src="svgIcons[icon.icon!]" :alt="icon.icon || 'brak ikony'" />
            </div>
          </div>
          <div class="item time">
            <b>{{ item.time }}</b>
          </div>
          <div class="item temperature">
            <b>{{ item.temperatureMax + '/' + item.temperatureMin }}</b>
            <p>{{ units.air_temperature }}</p>
          </div>
          <div class="item precipitation">
            <b>{{ item?.precipitation }}</b>
            <p>{{ units.precipitation_amount }}</p>
          </div>
          <div class="item sun_moon">
            <div class="sun">
              <b>{{ item.sunAndMoon.sun.sunrise }}</b>
              <div class="sun"></div>
              <b>{{ item.sunAndMoon.sun.sunset }}</b>
            </div>
            <div class="moon">
              <b>{{ item.sunAndMoon.moon.moonset }}</b>
              <div class="moon"></div>
              <b>{{ item.sunAndMoon.moon.moonrise }}</b>
            </div>
          </div>
          <ForecastWeatherForecastSummary v-if="item && item.hours.length > 1" :item="item" />
        </div>
      </div>
    </div>
    <div v-else class="container loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Ładowanie prognozy...</p>
    </div>
  </div>
</template>

<style scoped lang="less">
div.forecast {
  grid-area: forecast;
  min-height: 21em;
  margin-bottom: 2em;
  display: grid;
  grid-template-rows: max-content auto;
  justify-items: center;
  width: 100%;

  .container {
    > div {
      width: 100%;
      grid-column: 1 / 2;
      display: grid;
      grid-template-columns: 100%;
    }

    div.daily-weather {
      display: grid;
      grid-template:
        'sun_moon sun_moon sun_moon sun_moon'
        'time time time time'
        'icons icons icons icons'
        'temp temp precipitation precipitation'
        'details details details details';
      align-items: center;
      border-bottom: 2px solid;
      padding-bottom: 1em;
      grid-template-columns: 25% 25% 25% 25%;

      @media screen and (min-width: 768px) {
        grid-template:
          'sun_moon sun_moon'
          'time time'
          'icons icons'
          'temp precipitation'
          'details details';
        grid-template-columns: 50% 50%;
      }
    }
  }

  div.list-symbol {
    display: grid;
    grid-template-columns: repeat(4, 50px);
    justify-content: center;
    position: sticky;
    top: 0;
    left: 0;
    padding: 0;
    filter: opacity(1);
    z-index: 100;
    font-size: 0.5em;

    @media screen and (min-width: 768px) {
      grid-template-columns: repeat(4, 100px);
      gap: 2em;
      font-size: 1em;
    }
  }

  div.icons {
    grid-area: icons;
    display: grid;
    grid-template-columns: repeat(4, 50px);
    gap: 1em;
    justify-content: center;

    @media screen and (min-width: 768px) {
      grid-template-columns: repeat(4, 100px);
      gap: 2em;
    }

    .icon {
      grid-row: 1;

      &[data-time='0'] {
        grid-column: 1;
      }

      &[data-time='6'] {
        grid-column: 2;
      }

      &[data-time='12'] {
        grid-column: 3;
      }

      &[data-time='18'] {
        grid-column: 4;
      }

      img {
        width: 50px;
        height: 50px;
      }
    }
  }

  .item {
    display: flex;
    gap: 2px;

    &.time {
      grid-area: time;
      justify-content: center;
    }

    &.temperature {
      grid-area: temp;
      justify-content: center;
    }

    &.precipitation {
      grid-area: precipitation;
      justify-content: center;
    }

    &.sun_moon {
      grid-area: sun_moon;
      width: 100%;
      display: grid;
      grid-template:
        'sun sun'
        'moon moon';
      gap: 0.5em 1em;
      justify-items: center;
      grid-template-columns: 50% 50%;

      @media screen and (min-width: 768px) {
        grid-template:
          'sun moon'
          'sun moon';
        gap: 0.5em 1em;
      }

      > div {
        display: grid;
        text-align: center;
        justify-items: center;
        width: 100%;
        grid-template-columns: 33% 33% 33%;
        align-items: center;

        @media screen and (min-width: 768px) {
          width: 40%;
        }

        &.sun {
          grid-area: sun;

          .sun {
            width: 40px;
            height: 40px;
            background: url('~/assets/icons/sunny.png') no-repeat center center;
          }
        }

        &.moon {
          grid-area: moon;

          .moon {
            width: 40px;
            height: 40px;
            background: url('~/assets/icons/night.png') no-repeat center center;
          }
        }
      }
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
