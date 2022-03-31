import { format } from "date-fns";
import { Units } from "../atoms";

export function getImgUrl(id: string) {
  return `http://openweathermap.org/img/wn/${id}@4x.png`;
}

export function msToDate(number: number) {
  return new Date(number * 1000);
}

export function formatDate(date: Date) {
  return format(date, "h':'mma ");
}

export function getWindSpeed(speed: number, units: Units) {
  if (units === Units.celsius) {
    return Math.round(speed * 3.6) + " km/h";
  }

  return Math.round(speed * 1.609) + " mph";
}
