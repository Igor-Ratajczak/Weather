export const groupWeatherByDate = (weathers: WeatherTimeseries[]) => {
  return weathers.reduce(
    (accumulator, currentValue) => {
      const date = currentValue.time.split('T')[0];
      if (date) {
        if (!accumulator[date]) {
          accumulator[date] = [];
        }
        accumulator[date]!.push(currentValue);
      }
      return accumulator;
    },
    {} as Record<string, WeatherTimeseries[]>
  );
};
