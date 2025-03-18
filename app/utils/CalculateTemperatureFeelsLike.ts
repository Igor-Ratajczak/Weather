export const CalculateTemperatureFeelsLike = (temp: number, humidity: number, wind: number) => {
    let temperature_feels_like: number;
    if (temp > 26 && humidity > 40) {
        temperature_feels_like =
            -8.784695 +
            1.61139411 * temp +
            2.338549 * humidity -
            0.14611605 * temp * humidity -
            0.012308094 * Math.pow(temp, 2) -
            0.016424828 * Math.pow(humidity, 2) +
            0.002211732 * Math.pow(temp, 2) * humidity +
            0.00072546 * temp * Math.pow(humidity, 2) -
            0.000003582 * Math.pow(temp, 2) * Math.pow(humidity, 2);
    } else if (temp < 10 && wind > 5) {
        temperature_feels_like =
            13.12 +
            0.6215 * temp -
            11.37 * Math.pow(wind, 0.16) +
            0.3965 * temp * Math.pow(wind, 0.16);
    } else {
        temperature_feels_like = temp;
    }
    temperature_feels_like = Number(temperature_feels_like.toFixed(1));

    return temperature_feels_like
};