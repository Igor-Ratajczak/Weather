<script setup>
  import { ref } from 'vue';

  const timeseries = ref([]);
  const units = ref([]);
  async function getData() {
    const res = await fetch("https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=49.822&lon=19.04");
    const finalRes = await res.json();
    finalRes.properties.meta.units.air_temperature = "℃"
    console.log(finalRes);
    timeseries.value = finalRes.properties.timeseries;
    units.value = finalRes.properties.meta.units;
  }

 getData()
</script>

<template>
  <div class="future">
    <div class="item" v-for="item in timeseries" :key="item.data">
      <b>{{item.data.instant.details.air_pressure_at_sea_level + ' ' + units.air_pressure_at_sea_level}} </b>
      <b>{{item.data.instant.details.air_temperature + ' ' + units.air_temperature}} </b>
      <b>{{item.data.instant.details.cloud_area_fraction + ' ' + units.cloud_area_fraction}} </b>
      <b>{{item.data.instant.details.cloud_area_fraction_high + ' ' + units.cloud_area_fraction_high}} </b>
      <b>{{item.data.instant.details.cloud_area_fraction_low + ' ' + units.cloud_area_fraction_low}} </b>
      <b>{{item.data.instant.details.cloud_area_fraction_medium + ' ' + units.cloud_area_fraction_medium}} </b>
      <b>{{item.data.instant.details.dew_point_temperature + ' ' + units.dew_point_temperature}} </b>
      <b>{{item.data.instant.details.fog_area_fraction + ' ' + units.fog_area_fraction}} </b>
      <b>{{item.data.instant.details.relative_humidity + ' ' + units.relative_humidity}} </b>
      <b>{{item.data.instant.details.ultraviolet_index_clear_sky + ' ' + units.ultraviolet_index_clear_sky}} </b>
      <b>{{item.data.instant.details.wind_from_direction + ' ' + units.wind_from_direction}} </b>
      <b>{{item.data.instant.details.wind_speed + ' ' + units.wind_speed}} </b>
    </div>
  </div>
</template>

<style scoped>
div.item {
  background-color: white;
  color: black;
}
div.future {
  position: relative;
  display: inline-block;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease-in-out;
}
@media screen and (min-width: 768px){
  div.future::after {
    content: '';
    position: absolute;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    opacity: 0;
    border-radius: 5px;
    box-shadow: 0 5px 15px white;
    transition: opacity 0.3s ease-in-out;
  }
  div.future:hover::after{
    opacity: 1;
  }
  div.future:hover{
    
    transform: scale(1.02);
  }
}

</style>