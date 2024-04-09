export function ExtraData(item, units) {
  console.log(item)
  const data = {
    air_pressure_at_sea_level: item.pressure,
    air_temperature: item.temperature + ' ' + units.temperature,
    cloud_area_fraction: item.cloud.cloud_area_fraction + ' ' + units.cloud.cloud_area_fraction,
    cloud_area_fraction_high: item.cloud_area_fraction_high + ' ' + units.cloud_area_fraction_high,
    cloud_area_fraction_low: item.cloud_area_fraction_low + ' ' + units.cloud_area_fraction_low,
    cloud_area_fraction_medium:
      item.cloud_area_fraction_medium + ' ' + units.cloud_area_fraction_medium,
    dew_point_temperature: item.dew_point + ' ' + units.dew_point,
    fog_area_fraction: item.fog + ' ' + units.fog,
    relative_humidity: item.humidity + ' ' + units.humidity,
    ultraviolet_index_clear_sky: item.ultraviolet,
    wind_from_direction: item.wind.direction,
    wind_speed: item.wind.speed + ' ' + units.wind.speed
  }
  document.querySelector('.extra').classList.add('toogle_extra_data')
  document.querySelector('.extra > .time > b.day').innerHTML = item.time.split('T')[0]
  document.querySelector('.extra > .time > b.hour').innerHTML = item.time
    .split('T', 7)[1]
    .slice(0, 8)
  document.querySelector('.extra > .fog > b').innerHTML = data.fog_area_fraction
  document.querySelector('.extra > .humidity > b').innerHTML = data.relative_humidity
  document.querySelector('.extra > .ultraviolet > b').innerHTML = data.ultraviolet_index_clear_sky
  document.querySelector('.extra > .cloud > b').innerHTML = data.cloud_area_fraction
}

export function close() {
  document.querySelector('.extra').classList.remove('toogle_extra_data')
}
