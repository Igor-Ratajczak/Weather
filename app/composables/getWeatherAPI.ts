export async function getWeatherAPI(city: City): Promise<WeatherFeature> {
  const weatherState = useWeatherState().value;

  if (weatherState.weather && weatherState.updatedAt && !weatherState.cityChange) {
    const lastUpdate = new Date(weatherState.updatedAt);
    lastUpdate.setHours(lastUpdate.getHours() + 1);

    if (new Date().getTime() < lastUpdate.getTime()) {
      return weatherState.weather;
    }
  }
  if (navigator.onLine) {
    // Fetch new data
    let lat = city.latitude.toFixed(2);
    let lon = city.longitude.toFixed(2);
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/complete.json?lat=${lat}&lon=${lon}`;

    const weather = await $fetch<WeatherFeature>(url);

    if (!weather) {
      throw new Error('Weather data could not be retrieved');
    }

    weatherState.weather = weather;
    weatherState.updatedAt = String(new Date());
    weatherState.cityChange = false;
    return weather;
  } else {
    return weatherState.weather!;
  }
}
