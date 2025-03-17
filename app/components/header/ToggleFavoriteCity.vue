<script setup lang="ts">
const weatherState = useWeatherState().value;

const fill = ref(isFavoriteCity());

const ToggleFavoriteCity = () => {
  const favoriteCites = weatherState.favoriteCities;

  if (
    favoriteCites.length === 0 ||
    (favoriteCites.every((city) => city.properties.display_name !== weatherState.city.name) &&
      favoriteCites.every((city) => city.geometry.coordinates[0] !== weatherState.city.latitude) &&
      favoriteCites.every((city) => city.geometry.coordinates[1] !== weatherState.city.longitude))
  ) {
    const favorite: FavoriteCities = {
      properties: {
        osm_id: weatherState.city.id,
        display_name: weatherState.city.name,
      },
      geometry: {
        coordinates: [weatherState.city.latitude, weatherState.city.longitude],
      },
      clicked: weatherState.city.clicked,
    };
    favoriteCites.push(favorite);
    fill.value = '#FF0000';
  } else {
    fill.value = '#000000';
    favoriteCites.splice(
      favoriteCites.findIndex((city) => city.properties.display_name === weatherState.city.name),
      1
    );
  }
  weatherState.favoriteCities = favoriteCites;
};

watch(weatherState.city, () => {
  fill.value = isFavoriteCity();
});
</script>

<template>
  <div class="toggle-favorite" @click="ToggleFavoriteCity()">
    <HeaderFavoriteIcon :fill="fill" />
  </div>
</template>

<style scoped lang="less">
.toggle-favorite {
  grid-row: 3;
  grid-column: 2;
}
</style>