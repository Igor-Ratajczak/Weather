import { DateTime } from 'luxon';
import { useAppConfig } from '#app';

export function formatWeatherTimeseries(weathers: WeatherTimeseries[]): WeatherTimeseries[] {
  const weatherState = useWeatherState().value;
  return weathers.map((weather) => {
    weather.time = DateTime.fromISO(weather.time).setZone(weatherState.city.timeZone).toISO()!;
    return weather;
  });
}

export function updateWeatherIndex(weathers: WeatherTimeseries[], scrollBarColor: Ref<string>) {
  const state = useAppConfig();
  const weatherState = useWeatherState().value;

  const now = DateTime.now().setZone(weatherState.city.timeZone);

  if (now.minute === 0) {
    const index = getWeatherIndex(weathers);
    const relevantWeather = weathers.slice(index);
    getWeatherCurrent(relevantWeather[0] || weathers[0]!);
    getWeatherForecast(relevantWeather);
    scrollBarColor.value = getColor(state.weatherCurrent?.temperature);
  }
}
