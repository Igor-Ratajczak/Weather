export const processHourlyWeather = (weather: WeatherTimeseries): WeatherForecastHours => {
  return {
    icon: weather.data[getWeatherDataIndex(weather)]?.summary?.symbol_code! as WeatherCondition,
    time: String(getDate(weather.time, 'hour')),
    temperature: weather.data.instant.details.air_temperature,
    precipitation: weather.data[getWeatherDataIndex(weather)]?.details?.precipitation_amount || 0,
    windSpeed: Number(ConvertWindSpeed(weather.data.instant.details.wind_speed)),
    windDirection: weather.data.instant.details.wind_from_direction,
    extra: processWeatherExtra(weather),
  };
};

export const processWeatherIcons = (
  weathers: WeatherTimeseries[]
): {
  icon: WeatherCondition;
  time: number;
}[] => {
  const targetHours = [0, 6, 12, 18];
  const returnedIcons: { icon: WeatherCondition; time: number }[] = [];

  targetHours.forEach((target, idx) => {
    const nextTarget = targetHours[idx + 1] || target + 6;
    for (let hour = target; hour < nextTarget; hour++) {
      const adjustedHour = hour % 24;
      const weather = weathers.find((w) => Number(getDate(w.time, 'hour')) === adjustedHour);
      if (weather) {
        let icon;
        if (adjustedHour === target && weather.data?.next_6_hours?.summary?.symbol_code) {
          icon = weather.data.next_6_hours.summary.symbol_code;
        } else if (weather.data?.next_1_hours?.summary?.symbol_code) {
          icon = weather.data.next_1_hours.summary.symbol_code;
        } else {
          icon = weather.data.next_6_hours?.summary?.symbol_code;
        }
        if (icon) {
          returnedIcons.push({ icon, time: target });
          break;
        }
      }
    }
  });
  return returnedIcons;
};
export const processWeatherExtra = (weather: WeatherTimeseries): WeatherExtraData => {
  let details = weather.data.instant.details;
  return {
    time: String(getDate(weather.time, 'time')),
    humidity: details.relative_humidity,
    cloud: details.cloud_area_fraction,
    cloud_low: details.cloud_area_fraction_low,
    cloud_medium: details.cloud_area_fraction_medium,
    cloud_high: details.cloud_area_fraction_high,
    ultraviolet: details.ultraviolet_index_clear_sky,
    dew_point_temperature: details.dew_point_temperature,
  };
};
