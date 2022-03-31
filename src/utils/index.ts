import { format } from "date-fns";

export function getImgUrl(id: string) {
  return `http://openweathermap.org/img/wn/${id}@4x.png`;
}

export function getWideSpeedInMph(speed: number) {
  return Math.round(speed * 1.609);
}

export function msToDate(number: number) {
  return new Date(number * 1000);
}

export function formatDate(date: Date) {
  return format(date, "h':'mma ");
}
