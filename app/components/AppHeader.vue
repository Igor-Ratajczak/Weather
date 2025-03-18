<script setup lang="ts">
import ToggleFavoriteCity from '~/components/header/ToggleFavoriteCity.vue';

const weatherState = useWeatherState().value;
</script>

<template>
  <div class="header container">
    <HeaderChangeTheme />
    <HeaderFavoriteCities />
    <HeaderSearchBar />
    <h1>Witaj w Weather 2.0</h1>
    <ToggleFavoriteCity />
    <div class="city">
      <b>{{ weatherState.city.name }}</b>
      <p>{{ weatherState.city.latitude.toFixed(2) }}, {{ weatherState.city.longitude.toFixed(2) }}</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
div.header {
  grid-area: header;
  display: grid;
  grid-template: 40px max-content 34px 35px / 50px auto 50px;
  justify-items: center;
  gap: 10px;
  font-size: 12px;
  z-index: 100;
  position: relative;

  h1 {
    grid-row: 2;
    grid-column: 1/4;
    text-align: center;
  }

  .city {
    display: flex;
    grid-row: 4;
    grid-column: 1/4;
    gap: 1em;
  }
}
</style>
