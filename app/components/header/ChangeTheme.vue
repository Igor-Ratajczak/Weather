<script setup lang="ts">
const weatherState = useWeatherState().value;

const changeTheme = () => {
  weatherState.theme = weatherState.theme === 'light' ? 'dark' : 'light';
};
if (!weatherState.theme) {
  const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');

  if (darkThemeMq.matches) {
    weatherState.theme = 'dark';
  } else {
    weatherState.theme = 'light';
  }
}
</script>

<template>
  <div class="change-theme" @click="changeTheme">
    <div class="button-theme" :class="weatherState.theme"></div>
  </div>
</template>

<style scoped lang="less">
.change-theme {
  grid-row: 1;
  width: 40px;
  height: 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50px;
  justify-self: start;
  position: relative;
  cursor: pointer;
  padding: 5px;

  .button-theme {
    width: 10px;
    height: 10px;
    border-radius: 50px;
    cursor: pointer;
    position: relative;
    transition: left 0.5s ease-in-out;

    &.light {
      background: url('public/sun.svg') no-repeat center center;
      left: 0;
    }

    &.dark {
      background: url('public/moon.svg') no-repeat center center;
      left: calc(100% - 10px);
    }
  }
}
</style>
