import { useQuery } from "react-query";
import { api } from "../services";

type RequestWeather = {
  lat: number;
  lon: number;
};

export type WeatherResponse = {
  name: string;
  coord: { lon: number; lat: number };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  sys: { country: string; sunrise: number; sunset: number };
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  wind: {
    speed: number;
  };
};

function getWeather(params: RequestWeather) {
  return async () => {
    const { data } = await api.get<WeatherResponse>(
      `/weather?lat=${params.lat}&lon=${params.lon}&units=imperial`
    );
    return data;
  };
}

export function useWeather(params: RequestWeather) {
  return useQuery(["weather", params], getWeather(params));
}
