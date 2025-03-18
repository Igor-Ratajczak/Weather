export type WeatherPeriod = 'next_1_hours' | 'next_6_hours' | 'next_12_hours';

export const getWeatherDataIndex = (weather: WeatherTimeseries): WeatherPeriod => {
  const data = weather.data;
  if (data.next_1_hours && data.next_1_hours.summary) {
    return 'next_1_hours';
  } else if (data.next_6_hours && data.next_6_hours.summary) {
    return 'next_6_hours';
  } else {
    return 'next_12_hours';
  }
};
