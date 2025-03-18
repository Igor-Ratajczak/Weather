import { isSameDay, isNextDay } from '~/composables/getDate';

export function setDaysNames(time: string): string {
  if (isSameDay(time)) {
    return 'Dziś';
  } else if (isNextDay(time)) {
    return 'Jutro';
  }

  const dayNames: Record<number, string> = {
    1: 'Poniedziałek',
    2: 'Wtorek',
    3: 'Środa',
    4: 'Czwartek',
    5: 'Piątek',
    6: 'Sobota',
    7: 'Niedziela',
  };

  return `${getDate(time, 'ddMM')} ${dayNames[getDate(time, 'weekday') as number]}`;
}
