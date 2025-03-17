declare global {
  interface WeatherUnits {
    air_pressure_at_sea_level: string;
    air_temperature: string;
    air_temperature_max: string;
    air_temperature_min: string;
    cloud_area_fraction: string;
    cloud_area_fraction_high: string;
    cloud_area_fraction_low: string;
    cloud_area_fraction_medium: string;
    dew_point_temperature: string;
    fog_area_fraction: string;
    precipitation_amount: string;
    relative_humidity: string;
    ultraviolet_index_clear_sky: string;
    wind_from_direction: string;
    wind_speed: string;
  }

  interface WeatherMeta {
    updated_at: string;
    units: WeatherUnits;
  }

  interface WeatherDetails {
    air_pressure_at_sea_level: number;
    air_temperature: number;
    cloud_area_fraction: number;
    cloud_area_fraction_high: number;
    cloud_area_fraction_low: number;
    cloud_area_fraction_medium: number;
    dew_point_temperature: number;
    fog_area_fraction: number;
    relative_humidity: number;
    ultraviolet_index_clear_sky: number;
    wind_from_direction: number;
    wind_speed: number;
  }

  interface WeatherSummary {
    symbol_code: WeatherCondition;
  }

  interface WeatherPeriodDetails {
    precipitation_amount?: number;
    air_temperature_max?: number;
    air_temperature_min?: number;
  }

  interface WeatherPeriodData {
    summary?: WeatherSummary;
    details?: WeatherPeriodDetails;
  }

  interface WeatherInstantData {
    details: WeatherDetails;
  }

  interface WeatherData {
    instant: WeatherInstantData;
    next_12_hours?: WeatherPeriodData;
    next_1_hours?: WeatherPeriodData;
    next_6_hours?: WeatherPeriodData;
  }

  interface WeatherTimeseries {
    time: string;
    data: WeatherData;
  }

  interface WeatherProperties {
    meta: WeatherMeta;
    timeseries: WeatherTimeseries[];
  }

  interface WeatherGeometry {
    type: string;
    coordinates: number[];
  }

  interface WeatherFeature {
    type: string;
    geometry: WeatherGeometry;
    properties: WeatherProperties;
  }

  interface WeatherCurrentData {
    icon: WeatherCondition;
    temperature: number;
    precipitation: number;
    windSpeed: number;
    windDirection: number;
    temperature_feels_like: number;
    humidity: number;
    pressure: number;
    extra: WeatherExtraData;
  }

  interface WeatherForecast {
    icon: Array<{
      icon: WeatherCondition | null;
      time: number;
    }>;
    time: string;
    temperatureMax: number;
    temperatureMin: number;
    precipitation: number;
    hours: WeatherForecastHours[];
    sunAndMoon: {
      sun: {
        sunrise: string;
        sunset: string;
      };
      moon: {
        moonrise: string;
        moonset: string;
        illumination: {
          fraction: number;
          phase: number;
          angle: number;
        };
      };
    };
  }

  interface WeatherForecastHours {
    icon: WeatherCondition;
    time: string;
    temperature: number;
    precipitation: number;
    windSpeed: number;
    windDirection: number;
    extra: WeatherExtraData;
  }

  interface WeatherExtraData {
    time: string;
    humidity: number;
    cloud: number;
    cloud_low: number;
    cloud_medium: number;
    cloud_high: number;
    ultraviolet: number;
    dew_point_temperature: number;
  }

  interface LocationData {
    type: string;
    licence: string;
    features: LocationFeature[];
  }

  interface City {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    timeZone: string;
    clicked: number;
  }

  interface LocationFeature extends PopularCities {
    type: 'Feature';
    properties: {
      place_id: number;
      osm_type: 'node' | 'way' | 'relation';
      osm_id: number;
      place_rank: number;
      category: string;
      type: string;
      importance: number;
      addresstype: string;
      name: string;
      display_name: string;
    };
    bbox: [number, number, number, number];
    geometry: {
      type: 'Point';
      coordinates: [number, number];
    };
  }

  interface FavoriteCities extends PopularCities {
    properties: {
      osm_id: number;
      display_name: string;
    };
    geometry: {
      coordinates: [number, number];
    };
  }

  interface PopularCities {
    clicked: number;
  }
}

export {};
