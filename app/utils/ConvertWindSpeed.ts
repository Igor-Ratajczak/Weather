export const ConvertWindSpeed = (windSpeed: number): string => {
    return (windSpeed * 3600 / 1000).toFixed(1);
}