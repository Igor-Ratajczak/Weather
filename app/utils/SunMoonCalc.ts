import * as SunCalc from 'suncalc';
import { DateTime } from 'luxon';

export function getSunAndMoon(date: Date, latitude: number, longitude: number, timezone: string) {
  const dt = DateTime.fromJSDate(date).setZone(timezone); // Transfer date to the timezone
  const jsDate = dt.toJSDate();

  const sunTimes = SunCalc.getTimes(jsDate, latitude, longitude);
  const moonTimes = SunCalc.getMoonTimes(jsDate, latitude, longitude);
  const moonIllumination = SunCalc.getMoonIllumination(jsDate);

  const sunSunrise = sunTimes.sunrise;
  const sunSunset = sunTimes.sunset;
  const moonrise = moonTimes.rise;
  const moonset = moonTimes.set;

  return {
    sun: {
      sunrise: sunSunrise.toTimeString().slice(0, 5),
      sunset: sunSunset.toTimeString().slice(0, 5),
    },
    moon: {
      moonrise: moonrise ? moonrise.toTimeString().slice(0, 5) : '-',
      moonset: moonset ? moonset.toTimeString().slice(0, 5) : '-',
      illumination: moonIllumination,
    },
  };
}
