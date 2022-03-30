import { useQuery } from "react-query";
import { api } from "../services";

type RequestWeather = {
  lat: number;
  lon: number;
};

type WeatherResponse = {
  name: string;
  coord: { lon: number; lat: number };
  weather: Array<{
    id: number;
    main: string;
    description: string;
  }>;
};

function getWeather(params: RequestWeather) {
  return async () => {
    const { data } = await api.get<WeatherResponse>(
      `/weather?lat=${params.lat}&lon=${params.lon}`
    );
    return data;
  };
}

export function useWeather(params: RequestWeather) {
  return useQuery(["weather", params], getWeather(params));
}
