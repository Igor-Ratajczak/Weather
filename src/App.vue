<script setup>
import WeatherCurrent from './components/WeatherCurrent.vue'
import WeatherFuture from './components/WeatherFuture.vue'
</script>

<template>
  <header>
    <h1>Witaj w Weather 2.0</h1>
  </header>

  <main>
    <WeatherCurrent />
    <WeatherFuture />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
