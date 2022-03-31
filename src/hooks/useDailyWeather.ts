import { useQuery } from "react-query";
import { api } from "../services";
import { RequestWeather, WeatherDailyResponse } from "./types";

function getDailyWeather(params: RequestWeather) {
  return async () => {
    const exclude = ["minutely", "hourly", "alerts", "current"].join(",");

    const url = `/onecall?lat=${params.lat}&lon=${params.lon}&exclude=${exclude}&units=${params.units}`;

    const { data } = await api.get<WeatherDailyResponse>(url);

    return data;
  };
}

export function useDailyWeather(params: RequestWeather) {
  return useQuery(["dailyWeather", params], getDailyWeather(params), {
    staleTime: 2000,
  });
}
