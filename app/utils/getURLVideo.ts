import rain from '/bg/rain.mp4';
import rain2 from '/bg/rain2.mp4';
import heavy_rain from '/bg/heavy_rain.mp4';
import heavy_rain2 from '/bg/heavy_rain2.mp4';
import partly_cloudy from '/bg/partly_cloudy.mp4';
import partly_cloudy2 from '/bg/partly_cloudy2.mp4';
import cloudy from '/bg/cloudy.mp4';
import cloudy2 from '/bg/cloudy2.mp4';
import clear_sky from '/bg/clear_sky.mp4';
import clear_sky2 from '/bg/clear_sky2.mp4';
import clear_sky_night from '/bg/clear_sky_night.mp4';
import clear_sky_night2 from '/bg/clear_sky_night2.mp4';
import fair_sky from '/bg/fair_sky.mp4';
import fair_sky2 from '/bg/fair_sky2.mp4';
import sleet from '/bg/sleet.mp4';
import sleet2 from '/bg/sleet2.mp4';
import fog from '/bg/fog.mp4';
import fog2 from '/bg/fog2.mp4';
import snow from '/bg/snow.mp4';
import snow2 from '/bg/snow2.mp4';
import heavy_snow from '/bg/heavy_snow.mp4';
import heavy_snow2 from '/bg/heavy_snow2.mp4';
import thunder from '/bg/thunder.mp4';
import thunder2 from '/bg/thunder2.mp4';

export const weatherVideoMap: { [key in WeatherCondition]: [string, string] } = {
  rain: [rain, rain2],
  rainshowers_day: [rain, rain2],
  rainshowers_night: [rain, rain2],
  rainshowers_polartwilight: [rain, rain2],
  lightrain: [rain, rain2],
  lightrainshowers_day: [rain, rain2],
  lightrainshowers_night: [rain, rain2],
  lightrainshowers_polartwilight: [rain, rain2],
  heavyrain: [heavy_rain, heavy_rain2],
  heavyrainshowers_day: [heavy_rain, heavy_rain2],
  heavyrainshowers_night: [heavy_rain, heavy_rain2],
  heavyrainshowers_polartwilight: [heavy_rain, heavy_rain2],
  partlycloudy_day: [partly_cloudy, partly_cloudy2],
  partlycloudy_night: [partly_cloudy, partly_cloudy2],
  partlycloudy_polartwilight: [partly_cloudy, partly_cloudy2],
  cloudy: [cloudy, cloudy2],
  clearsky_day: [clear_sky, clear_sky2],
  clearsky_polartwilight: [clear_sky, clear_sky2],
  clearsky_night: [clear_sky_night, clear_sky_night2],
  fair_day: [fair_sky, fair_sky2],
  fair_night: [fair_sky, fair_sky2],
  fair_polartwilight: [fair_sky, fair_sky2],
  sleet: [sleet, sleet2],
  sleetshowers_day: [sleet, sleet2],
  sleetshowers_night: [sleet, sleet2],
  sleetshowers_polartwilight: [sleet, sleet2],
  lightsleet: [sleet, sleet2],
  lightsleetshowers_day: [sleet, sleet2],
  lightsleetshowers_night: [sleet, sleet2],
  lightsleetshowers_polartwilight: [sleet, sleet2],
  heavysleet: [sleet, sleet2],
  heavysleetshowers_day: [sleet, sleet2],
  heavysleetshowers_night: [sleet, sleet2],
  heavysleetshowers_polartwilight: [sleet, sleet2],
  fog: [fog, fog2],
  lightsnow: [snow, snow2],
  lightsnowshowers_day: [snow, snow2],
  lightsnowshowers_night: [snow, snow2],
  lightsnowshowers_polartwilight: [snow, snow2],
  snow: [snow, snow2],
  snowshowers_day: [snow, snow2],
  snowshowers_night: [snow, snow2],
  snowshowers_polartwilight: [snow, snow2],
  heavysnow: [heavy_snow, heavy_snow2],
  heavysnowshowers_day: [heavy_snow, heavy_snow2],
  heavysnowshowers_night: [heavy_snow, heavy_snow2],
  heavysnowshowers_polartwilight: [heavy_snow, heavy_snow2],
  heavyrainandthunder: [thunder, thunder2],
  heavyrainshowersandthunder_day: [thunder, thunder2],
  heavyrainshowersandthunder_night: [thunder, thunder2],
  heavyrainshowersandthunder_polartwilight: [thunder, thunder2],
  heavysleetandthunder: [thunder, thunder2],
  heavysleetshowersandthunder_day: [thunder, thunder2],
  heavysleetshowersandthunder_night: [thunder, thunder2],
  heavysleetshowersandthunder_polartwilight: [thunder, thunder2],
  heavysnowandthunder: [thunder, thunder2],
  heavysnowshowersandthunder_day: [thunder, thunder2],
  heavysnowshowersandthunder_night: [thunder, thunder2],
  heavysnowshowersandthunder_polartwilight: [thunder, thunder2],
  lightrainandthunder: [thunder, thunder2],
  lightrainshowersandthunder_day: [thunder, thunder2],
  lightrainshowersandthunder_night: [thunder, thunder2],
  lightrainshowersandthunder_polartwilight: [thunder, thunder2],
  lightsleetandthunder: [thunder, thunder2],
  lightsnowandthunder: [thunder, thunder2],
  lightssleetshowersandthunder_day: [thunder, thunder2],
  lightssleetshowersandthunder_night: [thunder, thunder2],
  lightssleetshowersandthunder_polartwilight: [thunder, thunder2],
  lightssnowshowersandthunder_day: [thunder, thunder2],
  lightssnowshowersandthunder_night: [thunder, thunder2],
  lightssnowshowersandthunder_polartwilight: [thunder, thunder2],
  rainandthunder: [thunder, thunder2],
  rainshowersandthunder_day: [thunder, thunder2],
  rainshowersandthunder_night: [thunder, thunder2],
  rainshowersandthunder_polartwilight: [thunder, thunder2],
  sleetandthunder: [thunder, thunder2],
  sleetshowersandthunder_day: [thunder, thunder2],
  sleetshowersandthunder_night: [thunder, thunder2],
  sleetshowersandthunder_polartwilight: [thunder, thunder2],
  snowandthunder: [thunder, thunder2],
  snowshowersandthunder_day: [thunder, thunder2],
  snowshowersandthunder_night: [thunder, thunder2],
  snowshowersandthunder_polartwilight: [thunder, thunder2],
};

export const getURLVideo = (weatherCondition: WeatherCondition): string => {
  let video = weatherVideoMap[weatherCondition];
  let random = Math.floor(Math.random() * video.length);
  return <string>video[random];
};

export type WeatherCondition =
  | 'rain'
  | 'rainshowers_day'
  | 'rainshowers_night'
  | 'rainshowers_polartwilight'
  | 'lightrain'
  | 'lightrainshowers_day'
  | 'lightrainshowers_night'
  | 'lightrainshowers_polartwilight'
  | 'heavyrain'
  | 'heavyrainshowers_day'
  | 'heavyrainshowers_night'
  | 'heavyrainshowers_polartwilight'
  | 'partlycloudy_day'
  | 'partlycloudy_night'
  | 'partlycloudy_polartwilight'
  | 'cloudy'
  | 'clearsky_day'
  | 'clearsky_polartwilight'
  | 'clearsky_night'
  | 'fair_day'
  | 'fair_night'
  | 'fair_polartwilight'
  | 'sleet'
  | 'sleetshowers_day'
  | 'sleetshowers_night'
  | 'sleetshowers_polartwilight'
  | 'lightsleet'
  | 'lightsleetshowers_day'
  | 'lightsleetshowers_night'
  | 'lightsleetshowers_polartwilight'
  | 'heavysleet'
  | 'heavysleetshowers_day'
  | 'heavysleetshowers_night'
  | 'heavysleetshowers_polartwilight'
  | 'fog'
  | 'lightsnow'
  | 'lightsnowshowers_day'
  | 'lightsnowshowers_night'
  | 'lightsnowshowers_polartwilight'
  | 'snow'
  | 'snowshowers_day'
  | 'snowshowers_night'
  | 'snowshowers_polartwilight'
  | 'heavysnow'
  | 'heavysnowshowers_day'
  | 'heavysnowshowers_night'
  | 'heavysnowshowers_polartwilight'
  | 'heavyrainandthunder'
  | 'heavyrainshowersandthunder_day'
  | 'heavyrainshowersandthunder_night'
  | 'heavyrainshowersandthunder_polartwilight'
  | 'heavysleetandthunder'
  | 'heavysleetshowersandthunder_day'
  | 'heavysleetshowersandthunder_night'
  | 'heavysleetshowersandthunder_polartwilight'
  | 'heavysnowandthunder'
  | 'heavysnowshowersandthunder_day'
  | 'heavysnowshowersandthunder_night'
  | 'heavysnowshowersandthunder_polartwilight'
  | 'lightrainandthunder'
  | 'lightrainshowersandthunder_day'
  | 'lightrainshowersandthunder_night'
  | 'lightrainshowersandthunder_polartwilight'
  | 'lightsleetandthunder'
  | 'lightsnowandthunder'
  | 'lightssleetshowersandthunder_day'
  | 'lightssleetshowersandthunder_night'
  | 'lightssleetshowersandthunder_polartwilight'
  | 'lightssnowshowersandthunder_day'
  | 'lightssnowshowersandthunder_night'
  | 'lightssnowshowersandthunder_polartwilight'
  | 'rainandthunder'
  | 'rainshowersandthunder_day'
  | 'rainshowersandthunder_night'
  | 'rainshowersandthunder_polartwilight'
  | 'sleetandthunder'
  | 'sleetshowersandthunder_day'
  | 'sleetshowersandthunder_night'
  | 'sleetshowersandthunder_polartwilight'
  | 'snowandthunder'
  | 'snowshowersandthunder_day'
  | 'snowshowersandthunder_night'
  | 'snowshowersandthunder_polartwilight';
