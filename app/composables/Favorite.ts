export const isFavoriteCity = (): string => {
  const weatherState = useWeatherState().value;

  const favoriteCities = weatherState.favoriteCities;

  const check = favoriteCities.some(
    (favoriteCity) =>
      favoriteCity.properties.display_name === weatherState.city.name &&
      favoriteCity.geometry.coordinates[0] === weatherState.city.latitude &&
      favoriteCity.geometry.coordinates[1] === weatherState.city.longitude
  );
  return check ? '#FF0000' : '#000000';
};
