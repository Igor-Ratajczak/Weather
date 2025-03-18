export const CalculateWeatherPrecipitation = (precipitation: number[]): number => {
    return precipitation.reduce((a, b) => a + b)
}