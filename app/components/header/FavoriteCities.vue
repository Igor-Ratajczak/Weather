<script setup lang="ts">
const weatherState = useWeatherState().value;
const favoriteCites = ref(weatherState.favoriteCities);
const showFavorite = ref(false);
const favoriteRef = useTemplateRef('favorite');
const setFavoriteCity = (city: FavoriteCities) => {
  weatherState.cityChange = true;
  weatherState.city.id = city.properties.osm_id;
  weatherState.city.name = city.properties.display_name;
  weatherState.city.latitude = city.geometry.coordinates[0];
  weatherState.city.longitude = city.geometry.coordinates[1];
  showFavorite.value = false;
};

window.addEventListener('click', (e: MouseEvent) => {
  if (favoriteRef.value && !favoriteRef.value.contains(e.target as Node)) {
    showFavorite.value = false;
  }
});

watch(
  () => weatherState.favoriteCities,
  () => {
    favoriteCites.value = weatherState.favoriteCities;
  }
);
</script>

<template>
  <div ref="favorite" v-if="favoriteCites.length > 0" class="favorite-container">
    <div class="button-favorite" @click="showFavorite = !showFavorite">
      <HeaderFavoriteIcon fill="#FF0000" />
    </div>
    <div v-if="showFavorite" class="list-favorite-cites">
      <div class="city" v-for="city in favoriteCites" @click="setFavoriteCity(city)">{{ city.properties.display_name }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.favorite-container {
  grid-row: 1;
  grid-column: 2/4;
  justify-self: center;
  position: relative;

  div.list-favorite-cites {
    position: fixed;
    right: 50%;
    background: light-dark(white, black);
    border-radius: 15px;
    padding: 1em;
    width: max-content;
    height: max-content;
    font-size: 1.5em;
    display: grid;
    transform: translateX(50%);
    gap: 2em;
    max-width: 100vw;
    cursor: pointer;
    text-align: center;

    @media (min-width: 1500px) {
      position: absolute;
      font-size: 1.8em;
    }
  }
}
</style>