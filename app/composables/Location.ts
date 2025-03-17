import popularCities from 'assets/popular_cities.json';

export const checkValidity = (query: string) => {
  const regex = /^[a-zA-Z\sąćęłńóśźżĄĆĘŁŃÓŚŹŻ-]+$/;
  return regex.test(query.trim());
};

function setCache(item: FavoriteCities | LocationFeature) {
  return {
    properties: {
      osm_id: item.properties.osm_id,
      display_name: item.properties.display_name,
    },
    geometry: {
      coordinates: [item.geometry.coordinates[0]!, item.geometry.coordinates[1]!] as [number, number], // Konwersja do tuple
    },
    clicked: 1,
  };
}

export function setCityCache(item: FavoriteCities | LocationFeature) {
  const cityCache = useWeatherState().value.cityCache;

  if (cityCache.size > 0) {
    if (cityCache.has(item.properties.osm_id)) {
      cityCache.get(item.properties.osm_id)!.clicked++;
    } else {
      cityCache.set(item.properties.osm_id, setCache(item));
    }
  } else {
    cityCache.set(item.properties.osm_id, setCache(item));
  }
  useWeatherState().value.cityCache = cityCache;
}

export const showPopularCities = (): FavoriteCities[] => {
  const cityCache = useWeatherState().value.cityCache;

  if (cityCache.size === 0) return Array.from(popularCities) as FavoriteCities[];

  // Filter out cities that are already in the cache
  const popular = popularCities.filter((city) => !cityCache.get(city.properties.osm_id)) as FavoriteCities[];

  let cites = [...cityCache.values(), ...popular];

  return Array.from(cites).sort((a, b) => b.clicked - a.clicked);
};
