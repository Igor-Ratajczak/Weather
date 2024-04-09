<script setup>
import { ref } from 'vue'
import state from './store.js'
import { ArrowKey, activeIndex } from './keysEvent.js'

const data = ref([])
const city = ref([])

async function getAddress(city) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${city}&format=json&polygon_kml=1&addressdetails=1`
  )
  const finalRes = await res.json()
  data.value = finalRes
  activeIndex.value = -1 // reset active index after search
}

function changeLocation(lat, lon, name) {
  localStorage.setItem('lat', lat)
  localStorage.setItem('lon', lon)
  localStorage.setItem('city', name)
  state.lat.value = lat
  state.lon.value = lon
  state.city.value = name
}

function selectCity() {
  if (activeIndex.value !== -1 && data.value.length > 0) {
    let selectedCity = data.value[activeIndex.value]

    let name
    console.log(selectedCity)
    if (selectedCity.type !== 'yes') {
      if (selectedCity.type === 'administrative') {
        name = selectedCity.name
      } else {
        name = selectedCity.address[selectedCity.type]
      }
    } else {
      name = selectedCity.address.state
    }
    changeLocation(selectedCity.lat, selectedCity.lon, name)
    data.value = []
    city.value = ''
    searchBar.value = ''
  }
}
const searchBar = ref('none')
</script>

<template>
  <div class="search_button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 50 50"
      @click="searchBar = searchBar === 'grid' ? '' : 'grid'"
    >
      <path
        d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"
      ></path>
    </svg>
  </div>
  <div class="search_container" :class="(city.length === 0 ? '' : 'sticky', searchBar)">
    <input
      v-model="city"
      type="search"
      class="input"
      :on-input="(activeIndex = -1)"
      autocorrect="false"
      placeholder="Wyszukaj miasto"
      @keydown.enter="getAddress(city)"
      @keydown.down="ArrowKey(data, 'down')"
      @keydown.up="ArrowKey(data, 'up')"
      @keydown.enter.prevent="selectCity()"
    />
    <button type="submit" class="search" @click="getAddress(city)">Szukaj</button>
    <div class="hint" :class="city.length === 0 ? ['none', (data = '')] : ''">
      <div
        v-for="item in data"
        :key="item"
        tabindex="0"
        @click="
          changeLocation(
            item.lat,
            item.lon,
            item.type !== 'administrative'
              ? item.address[item.type] === 'yes'
                ? item.address.state
                : item.address[item.type]
              : item.name
          ),
            (data = ''),
            (city = ''),
            (searchBar = '')
        "
      >
        <b>{{ item.display_name }}</b>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.search_button {
  margin-top: 20px;
  svg {
    cursor: pointer;
    transition: 0.5s transform ease-in-out;
    &:hover {
      transform: scale(1.2) rotate(10deg);
    }
    path {
      fill: var(--color-text);
    }
  }
}
.search_container {
  position: relative;
  z-index: 100;
  display: none;
  top: 0;
  opacity: 0;
  align-content: baseline;
  justify-self: center;
  width: 100%;
  transition:
    display 1s allow-discrete,
    opacity 1s;
}

.search_container::after {
  position: absolute;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  display: grid;
  background: rgb(0 0 0 / 47%);
  top: 0;
  align-content: baseline;
  padding: 10% 3em 0 3em;
  width: 100%;
}

input {
  width: 100%;
  place-self: center;
  height: 45px;
  border-radius: 10px 10px 0 0;
  border: 5px solid var(--color-text-hint);
  border-bottom: none;
  text-align: center;
}

input.input::placeholder {
  color: var(--color-text-hint) white;
}

input:focus {
  outline: none;
  border: 5px solid red;
  border-bottom: none;
}

button.search {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 15%;
  height: calc(100% - 5px);
  border-radius: 0 6px 0 0;
  background: var(--color-background-button);
  cursor: pointer;
}

button.search:hover {
  background: var(--color-background-button-hover);
}

.hint {
  display: flex;
  flex-direction: column;
  width: calc(100% - 6em);
  place-self: center;
  border-radius: 0 0 10px 10px;
  background: var(--color-background-hint);
  color: var(--color-text-hint);
  border: 5px solid var(--color-text-hint);
  border-top: none;
  position: absolute;
  z-index: 10000;
  top: calc(0px + 100%);
  width: 100%;
}

.hint div {
  padding: 10px;
  border-bottom: 2px solid var(--color-text-hint);
  cursor: pointer;
  height: 50px;
  align-items: center;
  display: grid;
}

.hint div:hover,
div.active {
  background: var(--color-background-hint-hover);
}

.hint div b {
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
}

div.sticky {
  position: sticky;
}
div.none {
  display: none;
}
div.grid {
  display: grid;
  opacity: 1;
}
</style>
