type ID = number;

interface WeatherState {
  theme: 'light' | 'dark' | null;
  city: City;
  cityChange: boolean;
  cityCache: Map<ID, FavoriteCities | LocationFeature>;
  favoriteCities: FavoriteCities[];
  searchCount: number;
  searchLimitResetDate: number | null;
  weather: WeatherFeature | null;
  updatedAt: string | null;
}

export const useWeatherState = (): Ref<WeatherState> => {
  return useState('weatherState', () => {
    // Default state
    const defaultState = {
      theme: null,
      city: {
        id: 0,
        name: 'Bielsko-Biała',
        latitude: 49.82245,
        longitude: 19.04686,
        timeZone: 'Europe/Warsaw',
        clicked: 0,
      },
      cityChange: false,
      cityCache: new Map(),
      favoriteCities: [],
      searchCount: 0,
      searchLimitResetDate: null,
      weather: null,
      updatedAt: null,
    };

    // Only try to access localStorage on client-side
    if (import.meta.client) {
      const stored = localStorage.getItem('weather_userState');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Convert the stored object back to Map
          parsed.cityCache = new Map(Object.entries(parsed.cityCache));
          return parsed;
        } catch (e) {
          console.error('Failed to parse stored state', e);
        }
      }
    }

    return defaultState;
  });
};
