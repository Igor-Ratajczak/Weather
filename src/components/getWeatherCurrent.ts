interface CurrentObject {
  time?: string;
  icon?: string;
  temperature?: number;
  temperature_feels_like?: number;
  pressure?: number;
  precipitation?: number;
  cloud?: {
    cloud_area_fraction?: number;
    cloud_area_fraction_low?: number;
    cloud_area_fraction_medium?: number;
    cloud_area_fraction_high?: number;
  };
  dew_point?: number;
  fog?: number;
  humidity?: number;
  ultraviolet?: number;
  wind?: {
    direction?: number;
    speed?: number;
  };
}
interface TimeSeriesData {
  time: string;
  data?: {
    instant?: {
      details?: {
        air_temperature?: number;
        relative_humidity?: number;
        wind_speed?: number;
      };
    };
    next_1_hours?: {
      summary?: {
        symbol_code?: string;
      };
    };
  };
}
function ObjectData(data: CurrentObject): CurrentObject {
  return data;
}
function getCurrentData(timeseries: TimeSeriesData[]) {
  const hoursNow =
    new Date().getHours() < 10
      ? "0" + new Date().getHours()
      : new Date().getHours();
  const dayNow =
    new Date().getDate() < 10
      ? "0" + new Date().getDate()
      : new Date().getDate();
  const MonthNow =
    new Date().getMonth() < 10
      ? "0" + new Date().getMonth()
      : new Date().getMonth();
  const weatherDetails: any = [];
  const weatherIcon: any = [];
  let temperature_feels_like;
  const weatherTime: any = [];
  timeseries.forEach((item, index: any) => {
    const time = item?.time;
    const hourObject =
      new Date(time).getUTCHours() < 10
        ? "0" + new Date(time).getUTCHours()
        : new Date(time).getUTCHours();
    const dayObject =
      new Date(time).getUTCDate() < 10
        ? "0" + new Date(time).getUTCDate()
        : new Date(time).getUTCDate();
    const MonthObject =
      new Date(time).getUTCMonth() < 10
        ? "0" + new Date(time).getUTCMonth()
        : new Date(time).getUTCMonth();
    if (Number(MonthNow) === Number(MonthObject)) {
      if (Number(dayNow) === Number(dayObject)) {
        if (Number(hoursNow) === Number(hourObject)) {
          weatherTime.push(item?.time);
          weatherDetails.push(item?.data?.instant?.details);
          const temp: any = item?.data?.instant?.details?.air_temperature;
          const humidity: any = item?.data?.instant?.details?.relative_humidity;
          const wind: any =
            Number(item?.data?.instant?.details?.wind_speed) * 3.6;

          if (temp > 26 && humidity > 40) {
            temperature_feels_like =
              -8.784695 +
              1.61139411 * temp +
              2.338549 * humidity -
              0.14611605 * temp * humidity -
              0.012308094 * Math.pow(temp, 2) -
              0.016424828 * Math.pow(humidity, 2) +
              0.002211732 * Math.pow(temp, 2) * humidity +
              0.00072546 * temp * Math.pow(humidity, 2) -
              0.000003582 * Math.pow(temp, 2) * Math.pow(humidity, 2);
          } else if (temp < 10 && wind > 5) {
            temperature_feels_like =
              13.12 +
              0.6215 * temp -
              11.37 * Math.pow(wind, 0.16) +
              0.3965 * temp * Math.pow(wind, 0.16);
          } else {
            temperature_feels_like =
              item?.data?.instant?.details?.air_temperature;
          }

          temperature_feels_like = temperature_feels_like.toFixed(1);
          weatherIcon.push(timeseries[index - 1]?.data);
        }
      }
    }
  });

  return { weatherDetails, weatherIcon, temperature_feels_like, weatherTime };
}
export function currentWeather(result) {
  let data: CurrentObject;
  const getData = getCurrentData(result?.timeseries);
  const weatherDetails: any = getData.weatherDetails[0];
  const weatherIcon: any = getData.weatherIcon[0];
  const temperature_feels_like = getData.temperature_feels_like;
  const time = getData.weatherTime[0];

  // eslint-disable-next-line prefer-const
  data = ObjectData({
    time: time,
    icon: weatherIcon.next_1_hours.summary.symbol_code,
    temperature: weatherDetails.air_temperature,
    temperature_feels_like: temperature_feels_like,
    pressure: weatherDetails.air_pressure_at_sea_level,
    precipitation: weatherIcon.next_1_hours.details.precipitation_amount,
    cloud: {
      cloud_area_fraction: weatherDetails.cloud_area_fraction,
      cloud_area_fraction_low: weatherDetails.cloud_area_fraction_low,
      cloud_area_fraction_medium: weatherDetails.cloud_area_fraction_medium,
      cloud_area_fraction_high: weatherDetails.cloud_area_fraction_high,
    },
    dew_point: weatherDetails.dew_point_temperature,
    fog: weatherDetails.fog_area_fraction,
    humidity: weatherDetails.relative_humidity,
    ultraviolet: weatherDetails.ultraviolet_index_clear_sky,
    wind: {
      direction: weatherDetails.wind_from_direction,
      speed: Number((Number(weatherDetails.wind_speed) * 3.6).toFixed(1)), // change m/s to km/h
    },
  });
  return data;
}
