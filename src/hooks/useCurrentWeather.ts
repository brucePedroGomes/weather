import { useQuery } from "react-query";
import { api } from "../services";
import { CurrentWeatherResponse, RequestWeather } from "./types";

function getCurrentWeather(params: RequestWeather) {
  return async () => {
    const url = `/weather?lat=${params.lat}&lon=${params.lon}&units=${params.units}`;

    const { data } = await api.get<CurrentWeatherResponse>(url);

    return data;
  };
}

export function useCurrentWeather(params: RequestWeather) {
  return useQuery(["currentWeather", params], getCurrentWeather(params), {
    staleTime: 2000,
  });
}
