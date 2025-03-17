export const getWeatherForecast = (weathers: WeatherTimeseries[]) => {
  const state = useAppConfig();

  const groupedForecastWeather = Object.values(groupWeatherByDate(weathers));
  const weatherForecast: Array<WeatherForecast> = [];

  groupedForecastWeather.forEach((ForecastWeather: WeatherTimeseries[]) => {
    const dayDate = getWeatherDay(ForecastWeather);
    if (dayDate) weatherForecast.push(dayDate);
  });

  state.weatherForecast = weatherForecast;
};

const getWeatherDay = (dayWeather: WeatherTimeseries[]): undefined | WeatherForecast => {
  if (dayWeather.length === 0) return;

  const weatherState = useWeatherState().value;

  const precipitation: number[] = [];
  const temperature: number[] = [];
  const icon: { icon: WeatherCondition; time: number }[] = processWeatherIcons(dayWeather);
  const hours: WeatherForecastHours[] = [];

  dayWeather.forEach((weather: WeatherTimeseries) => {
    hours.push(processHourlyWeather(weather));

    const weatherDetails = getWeatherDetails(weather);
    if (weatherDetails.precipitation_amount !== undefined) precipitation.push(weatherDetails.precipitation_amount);
    temperature.push(weather.data.instant.details.air_temperature);
  });

  if (precipitation.length === 0) return;

  const time = setDaysNames(dayWeather[0]!.time);
  const precipitationMax = Number(CalculateWeatherPrecipitation(precipitation).toFixed(1));

  return {
    time: time,
    icon: icon,
    precipitation: precipitationMax,
    temperatureMax: Math.max(...temperature),
    temperatureMin: Math.min(...temperature),
    hours: hours,
    sunAndMoon: getSunAndMoon(
      new Date(dayWeather[0]!.time),
      weatherState.city.latitude,
      weatherState.city.longitude,
      weatherState.city.timeZone
    ),
  };
};
