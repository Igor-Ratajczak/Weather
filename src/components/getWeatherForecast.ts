interface ForecastObject {
  shortWeather?: object
  forecast?: object
}
function getData(data: ForecastObject) {
  return data
}

function groupedByDate(timeseries) {
  return timeseries.reduce((acc: { x: string }, item: { time: string }) => {
    const date = item.time.split('T')[0]
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(item)
    return acc
  }, {})
}
function compareTemperatures(a, b) {
  return a - b
}
function temp(data) {
  data.temperature_max.sort(compareTemperatures)
  data.temperature_min.sort(compareTemperatures)

  const max = data.temperature_max[data.temperature_max.length - 1]
  const min = data.temperature_min[0]

  return { max, min }
}
function precipitation(data) {
  data.precipitation_max.sort(compareTemperatures)
  data.precipitation_min.sort(compareTemperatures)

  const max = data.precipitation_max[data.precipitation_max.length - 1]
  const min = data.precipitation_min[0]

  return { max, min }
}
function shortWeather(results: unknown) {
  const shortWeather = []
  Object.values(results).forEach((result) => {
    const day = {
      time: '',
      temperature_max: '',
      temperature_min: '',
      precipitation_max: '',
      precipitation_min: '',
      icon: { night: undefined, morning: undefined, midday: undefined, evening: undefined },
      precipitation: { night: undefined, morning: undefined, midday: undefined, evening: undefined }
    }
    const temp_max_min = {
      temperature_max: [],
      temperature_min: []
    }
    const precipitation_max_min = {
      precipitation_max: [],
      precipitation_min: []
    }
    const time_now = new Date().getDate()
    const dayNames = [
      'Niedziela',
      'Poniedziałek',
      'Wtorek',
      'Środa',
      'Czwartek',
      'Piątek',
      'Sobota'
    ]
    const dayNow = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
    const HourNow = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
    result.forEach((dayResult) => {
      const hourObject = dayResult?.time.substring(11, 13)
      const dayObject = dayResult?.time.substring(8, 10)
      if (Number(hourObject) <= Number(HourNow) && Number(dayObject) === Number(dayNow)) {
        /* empty */
      } else {
        const tempValue = dayResult?.data.instant?.details.air_temperature
        const precipitation = dayResult?.data.next_6_hours?.details?.precipitation_amount
        console.log(tempValue, dayResult?.time)

        if (String(['00 06 12 18']).includes(hourObject)) {
          if (precipitation !== undefined) {
            precipitation_max_min.precipitation_max.push(precipitation)
          }
          if (precipitation !== undefined) {
            precipitation_max_min.precipitation_min.push(precipitation)
          }
        }
        temp_max_min.temperature_max.push(tempValue)
        temp_max_min.temperature_min.push(tempValue)

        const time_day = dayResult.time.substring(8, 10)
        if (Number(time_day) === Number(time_now)) {
          day.time = 'Dziś'
        } else if (Number(time_day) - 1 === Number(time_now)) {
          day.time = 'Jutro'
        } else {
          day.time = time_day + ' ' + dayNames[new Date(dayResult.time).getUTCDay()]
        }
        switch (hourObject) {
          case '00':
            day.icon.night = dayResult?.data.next_6_hours?.summary.symbol_code
            day.precipitation.night = dayResult?.data.next_6_hours?.details.precipitation_amount
            break
          case '06':
            day.icon.morning = dayResult?.data.next_6_hours?.summary.symbol_code
            day.precipitation.morning = dayResult?.data.next_6_hours?.details.precipitation_amount
            break
          case '12':
            day.icon.midday = dayResult?.data.next_6_hours?.summary.symbol_code
            day.precipitation.midday = dayResult?.data.next_6_hours?.details.precipitation_amount
            break
          case '18':
            day.icon.evening = dayResult?.data.next_6_hours?.summary.symbol_code
            day.precipitation.evening = dayResult?.data.next_6_hours?.details.precipitation_amount
            break
          default:
            break
        }
      }
    })
    day.temperature_max += temp(temp_max_min).max
    day.temperature_min += temp(temp_max_min).min
    // console.log(temp_max_min, day)

    day.precipitation_max += precipitation(precipitation_max_min).max
    day.precipitation_min += precipitation(precipitation_max_min).min
    shortWeather.push(day)
  })
  return shortWeather
}
function longWeather(results: unknown) {
  const forecast = []

  Object.values(results).forEach((result) => {
    const day = []
    result.forEach((dayResult) => {
      const hour = {
        time: '',
        icon: '',
        temperature: '',
        pressure: '',
        precipitation: '',
        cloud: {
          cloud_area_fraction: '',
          cloud_area_fraction_low: '',
          cloud_area_fraction_medium: '',
          cloud_area_fraction_high: ''
        },
        dew_point: '',
        fog: '',
        humidity: '',
        ultraviolet: '',
        wind: {
          direction: '',
          speed: Number()
        }
      }
      const time = dayResult?.time
      const details = dayResult.data.instant.details
      const getHours = new Date().getHours()
      const getDate = new Date().getDate()
      const next_6_hours = dayResult.data?.next_6_hours

      if (Number(time.substring(11, 13)) <= getHours && Number(time.substring(8, 10)) === getDate) {
        /* empty */
      } else {
        hour.time = time
        hour.icon =
          dayResult.data?.next_1_hours === undefined
            ? next_6_hours === undefined
              ? 'none'
              : next_6_hours?.summary.symbol_code
            : dayResult.data?.next_1_hours?.summary.symbol_code
        hour.precipitation =
          dayResult.data?.next_1_hours === undefined
            ? next_6_hours === undefined
              ? 'none'
              : next_6_hours?.details.precipitation_amount
            : dayResult.data?.next_1_hours?.details.precipitation_amount
        hour.temperature = details.air_temperature
        hour.pressure = details.air_pressure_at_sea_level
        hour.fog = details.fog_area_fraction
        hour.humidity = details.relative_humidity
        hour.ultraviolet = details.ultraviolet_index_clear_sky
        hour.cloud.cloud_area_fraction = details.cloud_area_fraction
        hour.cloud.cloud_area_fraction_low = details.cloud_area_fraction_low
        hour.cloud.cloud_area_fraction_medium = details.cloud_area_fraction_medium
        hour.cloud.cloud_area_fraction_high = details.cloud_area_fraction_high
        hour.dew_point = details.dew_point_temperature
        hour.wind.speed = Number((Number(details.wind_speed) * 3.6).toFixed(1))
        hour.wind.direction = details.wind_from_direction
        day.push(hour)
      }
    })
    forecast.push(day)
  })
  return forecast
}
export function forecastWeather(result) {
  const grouped = groupedByDate(result.timeseries)
  const data = getData({
    shortWeather: shortWeather(grouped), // weather showing weather for all day (night, morning, midday, evening)
    forecast: longWeather(grouped) // weather for day every hour or every 6 hours
  })
  return data
}
