interface CurrentObject {
  time?: string
  icon?: string
  temperature?: number
  pressure?: number
  precipitation?: number
  cloud?: {
    cloud_area_fraction?: number
    cloud_area_fraction_low?: number
    cloud_area_fraction_medium?: number
    cloud_area_fraction_high?: number
  }
  dew_point?: number
  fog?: number
  humidity?: number
  ultraviolet?: number
  wind?: {
    direction?: number
    speed?: number
  }
}

function ObjectData(data: CurrentObject) {
  return data
}
function getCurrentData(timeseries) {
  const hoursNow = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
  const dayNow = new Date().getDay() < 10 ? '0' + new Date().getDay() : new Date().getDay()
  const MonthNow = new Date().getMonth() < 10 ? '0' + new Date().getMonth() : new Date().getMonth()
  const weatherDetails = []
  const weatherIcon = []
  const weatherTime = []
  timeseries.forEach((data, index) => {
    const time = data?.time
    const hourObject =
      new Date(time).getUTCHours() < 10
        ? '0' + new Date(time).getUTCHours()
        : new Date(time).getUTCHours()
    const dayObject =
      new Date(time).getUTCDay() < 10
        ? '0' + new Date(time).getUTCDay()
        : new Date(time).getUTCDay()
    const MonthObject =
      new Date(time).getUTCMonth() < 10
        ? '0' + new Date(time).getUTCMonth()
        : new Date(time).getUTCMonth()
    if (Number(MonthNow) === Number(MonthObject)) {
      if (Number(dayNow) === Number(dayObject)) {
        if (Number(hoursNow) === Number(hourObject)) {
          weatherTime.push(data?.time)
          weatherDetails.push(data?.data.instant.details)
          weatherIcon.push(timeseries[index - 1]?.data)
        }
      }
    }
  })
  return { weatherDetails, weatherIcon, weatherTime }
}
export function currentWeather(result) {
  let data: CurrentObject
  const getData = getCurrentData(result?.timeseries)
  const weatherDetails = getData.weatherDetails[0]
  const weatherIcon = getData.weatherIcon[0]
  const time = getData.weatherTime[0]

  // eslint-disable-next-line prefer-const
  data = ObjectData({
    time: time,
    icon: weatherIcon.next_1_hours.summary.symbol_code,
    temperature: weatherDetails.air_temperature,
    pressure: weatherDetails.air_pressure_at_sea_level,
    precipitation: weatherIcon.next_1_hours.details.precipitation_amount,
    cloud: {
      cloud_area_fraction: weatherDetails.cloud_area_fraction,
      cloud_area_fraction_low: weatherDetails.cloud_area_fraction_low,
      cloud_area_fraction_medium: weatherDetails.cloud_area_fraction_medium,
      cloud_area_fraction_high: weatherDetails.cloud_area_fraction_high
    },
    dew_point: weatherDetails.dew_point_temperature,
    fog: weatherDetails.fog_area_fraction,
    humidity: weatherDetails.relative_humidity,
    ultraviolet: weatherDetails.ultraviolet_index_clear_sky,
    wind: {
      direction: weatherDetails.wind_from_direction,
      speed: Number((Number(weatherDetails.wind_speed) * 3.6).toFixed(1)) // change m/s to km/h
    }
  })
  return data
}
