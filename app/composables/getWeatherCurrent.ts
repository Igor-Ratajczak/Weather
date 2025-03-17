export const getWeatherCurrent = (currentWeather: WeatherTimeseries) => {
  const state = useAppConfig();

  const currentWeatherDetails = currentWeather.data.instant.details;
  const dataIndex = getWeatherDataIndex(currentWeather);
  const icon = currentWeather.data[dataIndex]?.summary?.symbol_code;
  const temperature = currentWeatherDetails.air_temperature;
  const humidity = currentWeatherDetails.relative_humidity;
  const windSpeed = ConvertWindSpeed(currentWeatherDetails.wind_speed);
  const windDirection = currentWeatherDetails.wind_from_direction;
  const temperature_feels_like = CalculateTemperatureFeelsLike(temperature, humidity, Number(windSpeed));
  const pressure = currentWeatherDetails.air_pressure_at_sea_level;
  const precipitation = currentWeather.data[dataIndex]?.details?.precipitation_amount;
  const extra = processWeatherExtra(currentWeather);

  state.weatherCurrent = {
    icon: icon || '',
    temperature: temperature,
    humidity: humidity,
    windSpeed: windSpeed,
    windDirection: windDirection,
    temperature_feels_like: temperature_feels_like,
    pressure: pressure,
    precipitation: precipitation || 0,
    extra: extra,
  };
};
