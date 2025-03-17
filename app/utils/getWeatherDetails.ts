export const getWeatherDetails = (weather: WeatherTimeseries) => {
  const index = getWeatherDataIndex(weather);
  return weather.data[index]?.details || {};
};
