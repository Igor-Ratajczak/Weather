import { DateTime } from 'luxon';

type DateFormat = 'hour' | 'day' | 'month' | 'time' | 'ddMM' | 'weekday';

export function getDate(time: string, type: DateFormat): string | number {
  // time type yyyy-MM-ddTHH:mm:ss.SSSZ
  switch (type) {
    case 'month':
      return time.substring(5, 7);
    case 'day':
      return time.substring(8, 10);
    case 'hour':
      return time.substring(11, 13);
    case 'time':
      return `${time.substring(0, 4)} ${time.substring(5, 7)} ${time.substring(8, 10)}, ${time.substring(11, 16)}`; // format - yyyy LL dd, HH:mm
    case 'ddMM':
      return `${time.substring(8, 10)} ${time.substring(5, 7)}`; // format - ddMM
    case 'weekday':
      return DateTime.fromISO(time).setZone(useWeatherState().value.city.timeZone).weekday;
    default:
      return 0;
  }
}

export function isSameDay(time: string): boolean {
  const weatherState = useWeatherState().value;
  const date = DateTime.fromISO(time).setZone(weatherState.city.timeZone);
  const now = DateTime.now().setZone(weatherState.city.timeZone);
  return date.hasSame(now, 'day');
}

export function isNextDay(time: string): boolean {
  const weatherState = useWeatherState().value;
  const date = DateTime.fromISO(time).setZone(weatherState.city.timeZone);
  const tomorrow = DateTime.now().setZone(weatherState.city.timeZone).plus({ days: 1 });
  return date.hasSame(tomorrow, 'day');
}
