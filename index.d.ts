import type { WeatherCurrentData, WeatherExtraData } from '~~/types/global';

declare module '@nuxt/schema' {
  interface AppConfigInput {
    weatherUnits: WeatherUnits;
    weatherCurrent: WeatherCurrentData | null;
    weatherForecast: WeatherForecast[] | [];
    weatherDeprecated: boolean;
    weatherExtraData: WeatherExtraData | null;
  }

  interface AppConfig {
    weatherUnits: WeatherUnits;
    weatherCurrent: WeatherCurrent | null;
    weatherForecast: WeatherForecast[] | [];
    weatherDeprecated: boolean;
    weatherExtraData: WeatherExtraData | null;
  }
}

export {};
