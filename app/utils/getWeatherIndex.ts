import { DateTime } from 'luxon';

export const getWeatherIndex = (weathers: WeatherTimeseries[]): number => {
  const weatherState = useWeatherState().value;
  const now = DateTime.now().setZone(weatherState.city.timeZone);

  let index = weathers.findIndex((weather) => {
    const weatherTime = DateTime.fromISO(weather.time).setZone(weatherState.city.timeZone);
    return weatherTime.hasSame(now, 'day') && weatherTime.hour === now.hour;
  });

  if (index === -1) {
    index = weathers.findIndex((weather) => {
      const weatherTime = DateTime.fromISO(weather.time).setZone(weatherState.city.timeZone);
      return weatherTime.hasSame(now, 'day') && weatherTime.hour <= now.hour && now.hour < weatherTime.hour + 6;
    });
  }

  if (
    (index !== -1 && weathers[index]?.data.next_1_hours !== undefined) ||
    weathers[index]?.data.next_6_hours !== undefined ||
    weathers[index]?.data.next_12_hours !== undefined
  )
    return index;
  else return 0;
};
