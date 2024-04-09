import { currentWeather } from './getWeatherCurrent'
import { forecastWeather } from './getWeatherForecast'

/****** units object **********/

export const unitsObject = {
  icon: '',
  temperature: '℃',
  pressure: 'hpa',
  precipitation: 'mm',
  cloud: {
    cloud_area_fraction: '%',
    cloud_area_fraction_low: '%',
    cloud_area_fraction_medium: '%',
    cloud_area_fraction_high: '%'
  },
  dev_point: '',
  fog: '%',
  humidity: '%',
  ultraviolet: '',
  wind: {
    direction: 'deg',
    speed: 'km/h'
  }
}

/****** data weather object **********/

export function main(result: unknown, option) {
  if (option === 'current') {
    const current = currentWeather(result) // current weather

    return { current }
  } else {
    const forecast = forecastWeather(result) // forecast weather
    return { forecast }
  }
}
