<script setup lang="ts">
const state = useAppConfig();
const data = ref<WeatherExtraData | null>(state.weatherExtraData);

watch(
  () => state.weatherExtraData,
  (newData) => {
    data.value = newData;
  }
);
</script>

<template>
  <Transition name="extra">
    <div v-if="data" class="extra-container">
      <div class="close" @click="state.weatherExtraData = null">X</div>
      <div class="title">{{ data.time }}</div>
      <div class="data">
        <div class="humidity">
          <p>Wilgotność</p>
          <b>{{ data.humidity + state.weatherUnits.relative_humidity }}</b>
        </div>
        <div class="cloud">
          <p>Zachmurzenie</p>
          <b>{{ data.cloud + state.weatherUnits.cloud_area_fraction }}</b>
        </div>
        <div class="cloud_low">
          <p>Chmury niskie</p>
          <b>{{ data.cloud_low + state.weatherUnits.cloud_area_fraction_low }}</b>
        </div>
        <div class="cloud_medium">
          <p>Chmury średnie</p>
          <b>{{ data.cloud_medium + state.weatherUnits.cloud_area_fraction_medium }}</b>
        </div>
        <div class="cloud_high">
          <p>Chmury wysokie</p>
          <b>{{ data.cloud_high + state.weatherUnits.cloud_area_fraction_high }}</b>
        </div>
        <div class="dew_point_temperature">
          <p>Temperatura punktu rosy</p>
          <b>{{ data.dew_point_temperature + state.weatherUnits.dew_point_temperature }}</b>
        </div>
        <div class="ultraviolet">
          <p>Ultrafiolet</p>
          <b>{{ data.ultraviolet + state.weatherUnits.ultraviolet_index_clear_sky }}</b>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="less">
.extra-enter-active,
.extra-leave-active {
  transition: transform 0.5s ease;
}

.extra-enter-from,
.extra-leave-to {
  transform: translateY(100%);
}

.extra-container {
  width: 100%;
  height: max-content;
  background: var(--color-background);
  color: var(--color-text);
  padding: 2em;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 10000;

  .close {
    float: right;
    font-size: 30px;
    cursor: pointer;
  }

  .title {
    font-size: 30px;
    text-align: center;
  }

  .data {
    width: 100%;
    display: grid;
    justify-items: center;
    grid-template-areas:
      'humudity'
      'dew_point_temperature'
      'ultraviolet'
      'cloud_low'
      'cloud'
      'cloud_medium'
      'cloud_high';

    > div {
      display: flex;
      gap: 10px;
    }

    .humidity {
      grid-area: humudity;
    }

    .cloud {
      grid-area: cloud;
    }

    .cloud_low {
      grid-area: cloud_low;
    }

    .cloud_medium {
      grid-area: cloud_medium;
    }

    .cloud_high {
      grid-area: cloud_high;
    }

    .humidity {
      grid-area: humudity;
    }

    .dew_point_temperature {
      grid-area: dew_point_temperature;
    }

    .ultraviolet {
      grid-area: ultraviolet;
    }
  }
}
</style>