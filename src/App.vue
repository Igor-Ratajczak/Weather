<script setup>
import { ref, watch } from 'vue'
import Location from './components/LocationSearch.vue'
import WeatherCurrent from './components/WeatherCurrent.vue'
import WeatherFuture from './components/WeatherFuture.vue'
import state from './components/store'
import { close } from './components/extraData'
import { fetchData } from './components/fetchData'

const city = ref([])
const buttonTheme = ref('0%')
const IconTheme = ref('./img/icons/sunny.png')

function loadCity() {
  city.value =
    localStorage.getItem('city') === null ? state.city.value : localStorage.getItem('city')
}

watch(
  [state.city],
  () => {
    if (state.city.value) {
      loadCity()
    }
  },
  { immediate: true }
)

function loadData() {
  const lat = localStorage.getItem('lat') === null ? state.lat.value : localStorage.getItem('lat')
  const lon = localStorage.getItem('lon') === null ? state.lon.value : localStorage.getItem('lon')
  fetchData(lat, lon).then((result) => {
    state.data.value = result
  })
}

watch(
  [state.lat, state.lon],
  () => {
    if (state.lat.value && state.lon.value !== 0) {
      loadData()
    }
  },
  { immediate: true }
)
let intervalId

function checkInternet() {
  fetch('./img/icons/drawing.svg')
    .then((response) => {
      if (response.ok) {
        loadData()
        console.log('online')
        clearInterval(intervalId)
      } else {
        console.log('offline')
      }
    })
    .catch(() => {
      console.log('offline')
    })
}

window.addEventListener('online', () => {
  intervalId = setInterval(() => {
    checkInternet()
  }, 5000)
})
window.addEventListener('offline', function () {
  let checkConnect = setTimeout(() => {
    !navigator.onLine ? '' : [loadData(), clearTimeout(checkConnect)]
  }, 1000)
})

setInterval(() => {
  loadData()
}, 600000) // 10 min

// function to set a given theme/color-scheme
function setTheme(themeName) {
  localStorage.setItem('theme', themeName)
  document.documentElement.className = themeName
}
// function to toggle between light and dark theme
function toggleTheme() {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-light')
    buttonTheme.value = '0%'
    IconTheme.value = './img/icons/sunny.png'
  } else {
    setTheme('theme-dark')
    buttonTheme.value = '100%'
    IconTheme.value = './img/icons/night.png'
  }
}
// Immediately invoked to set the theme on initial load

if (localStorage.getItem('theme') === 'theme-dark') {
  setTheme('theme-dark')
  buttonTheme.value = '100%'
  IconTheme.value = './img/icons/night.png'
} else {
  setTheme('theme-light')
  buttonTheme.value = '0%'
  IconTheme.value = './img/icons/sunny.png'
}
</script>

<template>
  <div id="background-container">
    <video id="video" autoplay loop muted>
      <source type="video/mp4" src="" />
    </video>
  </div>

  <header>
    <div class="weather-container">
      <div class="change-theme" @click="toggleTheme()">
        <div
          class="button-theme"
          :style="{
            transform: 'translateX(' + buttonTheme + ')',
            background: 'url(' + IconTheme + ')'
          }"
        ></div>
      </div>
      <h1>Witaj w Weather 2.0</h1>
      <b>{{ city }}</b>
      <Location />
    </div>
  </header>

  <main>
    <WeatherCurrent />
    <WeatherFuture />
    <div class="extra">
      <div class="close" @click="close">X</div>
      <div class="time"><b class="day"></b><b class="hour"></b></div>
      <div class="fog">
        <b></b>
        <p>mgła</p>
      </div>
      <div class="humidity">
        <b></b>
        <p>wilgotność</p>
      </div>
      <div class="ultraviolet">
        <b></b>
        <p>ultrafiolet</p>
      </div>
      <div class="cloud">
        <b></b>
        <p>chmury</p>
      </div>
    </div>
  </main>
  <footer>
    <div class="weather-container">
      <b>Dane pogodowe pochodzą z Norweskiego Instytutu Meterologicznego.</b>
      <p>
        {{
          'Copyright &copy; 2024-' +
          new Date().getFullYear() +
          ' Igor Ratajczak All Rights Reserved'
        }}
      </p>
    </div>
  </footer>
</template>

<style scoped lang="less">
#background-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  #video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}

header {
  line-height: 1.5;
  text-align: center;
  margin-top: 1em;
  z-index: 1000;
  h1 {
    margin-top: 20px;
  }
  div.change-theme {
    width: 48px;
    height: 24px;
    background: #c9c9c9;
    border-radius: 25px;
    position: absolute;
    cursor: pointer;
    opacity: 0.7;
    right: 0;
    margin-right: 40px;
    &:hover {
      opacity: 1;
    }
    div.button-theme {
      transition: 0.5s transform;
      width: 24px;
      height: 24px;
      background: rgb(177, 0, 0);
      border-radius: 25px;
      display: block;
    }
  }
}
main {
  display: grid;
  gap: 4em;
}
footer {
  width: 100%;
  z-index: 100;
  display: grid;
  font-size: 15px;
  text-align: center;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
