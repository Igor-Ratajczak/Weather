<script setup>
  import { ref } from 'vue';

  const timeseries = ref([]);
  const units = ref([]);
  async function getData() {
    const res = await fetch("https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=49.822&lon=19.04");
    const finalRes = await res.json();
    finalRes.properties.meta.units.air_temperature = "℃"
    console.log(finalRes);
    timeseries.value = finalRes.properties.timeseries[0].data.instant.details;
    units.value = finalRes.properties.meta.units;
  }

 getData()
</script>

<template>
  <div>
    <b>{{timeseries.air_pressure_at_sea_level + ' ' + units.air_pressure_at_sea_level}} </b>
    <b>{{timeseries.air_temperature + ' ' + units.air_temperature}} </b>
    <b>{{timeseries.cloud_area_fraction + ' ' + units.cloud_area_fraction}} </b>
    <b>{{timeseries.cloud_area_fraction_high + ' ' + units.cloud_area_fraction_high}} </b>
    <b>{{timeseries.cloud_area_fraction_low + ' ' + units.cloud_area_fraction_low}} </b>
    <b>{{timeseries.cloud_area_fraction_medium + ' ' + units.cloud_area_fraction_medium}} </b>
    <b>{{timeseries.dew_point_temperature + ' ' + units.dew_point_temperature}} </b>
    <b>{{timeseries.fog_area_fraction + ' ' + units.fog_area_fraction}} </b>
    <b>{{timeseries.relative_humidity + ' ' + units.relative_humidity}} </b>
    <b>{{timeseries.ultraviolet_index_clear_sky + ' ' + units.ultraviolet_index_clear_sky}} </b>
    <b>{{timeseries.wind_from_direction + ' ' + units.wind_from_direction}} </b>
    <b>{{timeseries.wind_speed + ' ' + units.wind_speed}} </b>
  </div>
</template>

<style scoped>
 div {
  background-color: red;
 }
</style>