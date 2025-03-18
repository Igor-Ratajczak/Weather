
export const setAnimeToCurrentWeather = (temperature: number): string => {
    if (temperature < 2) {
        if(temperature < 0) return 'icicle'
        return 'icicle melting'
    }
    return ''
}