<script setup lang="ts">
import IconArrow from 'public/IconArrow.svg';
import { svgIcons } from '~/utils/getURLWeatherIcons';

const weatherState = useWeatherState().value;
const state = useAppConfig();

const units: WeatherUnits = state.weatherUnits;

const weatherCurrent: Ref<WeatherCurrentData | null> = ref(null);

const weatherUpdatedAt = ref('');

watch(
  () => state.weatherCurrent,
  () => {
    if (state.weatherCurrent && weatherState.weather) {
      weatherCurrent.value = state.weatherCurrent;
      weatherUpdatedAt.value = new Date(weatherState.weather.properties.meta.updated_at).toUTCString();
    }
  }
);

const showExtraData = (data: WeatherCurrentData) => {
  state.weatherExtraData = data.extra;
};
</script>

<template>
  <div
    v-if="weatherCurrent"
    class="current container"
    :class="weatherCurrent.icon ? '' : 'loading-container'"
    @click="showExtraData(weatherCurrent)"
    :style="'--clr_currentWeather:' + getColor(weatherCurrent.temperature)"
  >
    <ForecastAnimeCurrentWeather :weather="weatherCurrent" />
    <img
      class="icon"
      :src="svgIcons[weatherCurrent.icon]"
      :alt="'weather current ' + weatherCurrent.icon"
      width="50px"
      height="50px"
    />
    <div class="temperature_container">
      <div class="temp">
        <b>{{ weatherCurrent.temperature }}</b>
        <p>{{ units.air_temperature }}</p>
      </div>
      <div class="temp_feels_like">
        <div>
          <b>{{ weatherCurrent.temperature_feels_like }}</b>
          <p>{{ units.air_temperature }}</p>
        </div>
        <p class="info">Temperatura odczuwalna</p>
      </div>
    </div>
    <div class="pressure">
      <b>{{ weatherCurrent.pressure }}</b>
      <p>{{ units.air_pressure_at_sea_level }}</p>
    </div>
    <div class="precipitation">
      <b>{{ weatherCurrent.precipitation + ' ' }}</b>
      <p>{{ units.precipitation_amount }}</p>
    </div>
    <div class="wind">
      <b>{{ weatherCurrent.windSpeed + ' ' }}</b>
      <p>{{ units.wind_speed }}</p>
      <img
        :src="IconArrow"
        alt="wind direction"
        :class="weatherState.theme === 'dark' ? 'dark' : 'light'"
        :style="{
          rotate: weatherCurrent.windDirection + 'deg',
        }"
      />
    </div>
  </div>
  <div v-else-if="!state.weatherDeprecated" class="current container loading-container">
    <div class="loading-spinner"></div>
    <p class="loading-text">Ładowanie pogody...</p>
  </div>
  <div v-else class="weather-deprecated container">
    <p>Nie masz najnowszej pogody! Ostatnia aktualizacja pogody:</p>
    <b>{{ weatherUpdatedAt }}</b>
  </div>
</template>

<style scoped lang="less">
div.weather-deprecated {
  padding: 2em;
  font-size: 1em;
  box-shadow:
    0 0 20px 5px red,
    inset 0 0 20px 5px red;
  display: flex;
  flex-direction: column;
  text-align: center;
}

div.current {
  grid-area: current;
  display: grid;
  grid-template:
    'icon icon'
    'temp temp'
    'wind wind'
    'precipitation precipitation'
    'pressure pressure';
  place-items: center;
  height: 100%;
  box-shadow:
    0 0 20px 5px var(--clr_currentWeather),
    inset 0 0 20px 5px var(--clr_currentWeather);

  @media screen and (min-width: 768px) {
    grid-template:
      'icon temp temp'
      'icon temp temp'
      'precipitation wind pressure';
  }

  div.current > b {
    grid-row: 2/3;
  }

  div,
  b {
    display: flex;
  }

  * {
    text-align: center;
    place-self: center;
  }

  img.icon {
    grid-area: icon;
  }

  .temperature_container {
    grid-area: temp;
    display: grid;
    gap: 2em;
    font-size: 1.5em;

    @media screen and (min-width: 768px) {
      display: flex;
    }

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
    grid-area: pressure;
  }

  .precipitation {
    grid-area: precipitation;
    display: ruby;
  }

  .wind {
    grid-area: wind;

    img {
      width: 25px;
      height: 25px;

      &.light {
        filter: invert(0%) brightness(1);
      }

      &.dark {
        filter: invert(100%) brightness(1);
      }
    }
  }
}
</style>
