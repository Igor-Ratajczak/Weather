<script setup lang="ts">
const weatherState = useWeatherState().value;
const search = ref(false);
const searchRef = useTemplateRef('searchRef');
const query = ref('');
const hints = ref<LocationFeature[] | FavoriteCities[]>([]);

const searchLocation = async () => {
  if (weatherState.searchCount > 5) {
    hints.value = showPopularCities();
  } else {
    if (query.value === '') {
      hints.value = showPopularCities();
      return;
    } else {
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${query.value}&format=geojson`;
        await $fetch(url).then((res) => {
          const searchData = res as LocationData;

          if (searchData.features) {
            hints.value = searchData.features;
            weatherState.searchCount++;
            if (weatherState.searchCount + 1 === 5) {
              weatherState.searchLimitResetDate = new Date().getTime();
            }
          }
        });
      } catch (error) {
        console.error('Błąd podczas wyszukiwania:', error);
        hints.value = showPopularCities();
      }
    }
  }
};

const changeLocation = (item: LocationFeature | FavoriteCities) => {
  weatherState.city.name = item.properties.display_name;
  weatherState.city.latitude = item.geometry.coordinates[1];
  weatherState.city.longitude = item.geometry.coordinates[0];
  search.value = false;
  weatherState.cityChange = true;
  setCityCache(item);
};

window.addEventListener('click', (e: MouseEvent) => {
  if (searchRef.value && !searchRef.value.contains(e.target as Node)) {
    search.value = false;
  }
});

function openSearch() {
  console.log('openSearch');
  search.value = true;
  hints.value = showPopularCities();
}
</script>

<template>
  <div ref="searchRef" class="search-container">
    <div class="search" :class="{ active: search }">
      <button class="search-button" @click="search ? searchLocation() : openSearch()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path
            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
          />
        </svg>
      </button>
      <button
        class="search-button close"
        @click="
          search = false;
          query = '';
        "
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <line x1="20" y1="20" x2="80" y2="80" stroke-width="10" stroke="black" />
          <line x1="80" y1="20" x2="20" y2="80" stroke-width="10" stroke="black" />
        </svg>
      </button>
    </div>
    <Transition name="opacity">
      <div v-if="search" class="search-bar">
        <input
          type="search"
          name="searchBar"
          id="SearchBar"
          placeholder="Wyszukaj miasto"
          v-model="query"
          :disabled="weatherState.searchCount > 5"
        />
        <div class="hints">
          <div class="hint" v-for="item in hints" :key="item.properties.osm_id" @click="changeLocation(item)">
            <b>{{ item.properties.display_name }}</b>
            <p>{{ item.geometry.coordinates[0].toFixed(3) + ', ' + item.geometry.coordinates[1].toFixed(3) }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="less">
.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 0.5s ease;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}

.search-container {
  grid-column: 3;
  grid-row: 1 / 2;
  height: 100%;
  width: 100%;
  z-index: 100000;
  align-items: center;
  display: grid;

  .search {
    display: flex;
    flex-direction: row-reverse;
    height: 100%;
    position: relative;
    width: 100%;
    z-index: 100000;
    align-items: end;

    .search-button {
      width: 30px;
      height: 30px;
      z-index: 10;
      right: 0;
      margin: 1em;
      position: absolute;
      transition: all 0.5s ease;
      cursor: pointer;

      svg {
        path,
        line {
          fill: light-dark(black, white);
          stroke: light-dark(black, white);
        }
      }

      &.close {
        opacity: 0;
        z-index: 5;
      }
    }

    &.active .search-button.close {
      right: 0 !important;
      opacity: 1 !important;
    }

    &.active .search-button {
      right: 35px;
    }
  }

  .search-bar {
    display: grid;
    grid-template-rows: 50px max-content;
    height: max-content;
    width: calc(100%);
    position: absolute;
    top: 0;
    left: 0;

    input[type='search'] {
      width: 100%;
      height: 50px;
      border-radius: 25px 25px 0 0;
      border: none;
      font-size: 18px;
      padding: 0 3em 0 20px;

      &::-webkit-search-decoration,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration {
        display: none;
      }
    }

    .hints {
      display: grid;
      width: 100%;
      background: light-dark(white, black);
      color: var(--color-text);
      border-radius: 0 0 25px 25px;
      align-items: end;
      min-height: 11em;
      max-height: 35em;
      overflow-y: auto;
      position: absolute;
      top: 50px;

      .hint {
        width: 100%;
        height: 3em;
        display: grid;
        gap: 1em;
        grid-template-columns: auto max-content;
        align-items: center;
        cursor: pointer;
        text-align: center;
        padding: 0 1em;

        b {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 11px;
        }

        @media screen and (min-width: 768px) {
          gap: 5em;
          padding: 0 3em;

          b {
            font-size: 15px;
          }
        }

        &.favorite::before {
          content: '❤️';
        }

        &:hover {
          background: light-dark(#cbcbcb, #363636);
        }

        &:last-child {
          border-radius: 0 0 25px 25px;
        }
      }
    }
  }
}
</style>
