export function getColor(temperature: number) {
    const hue = 220 - (temperature + 10) * (220 / 50);
    return `hsl(${Math.round(hue)}, 100%, 50%)`;
}
