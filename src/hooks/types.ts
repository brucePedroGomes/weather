export type RequestWeather = {
  lat: number;
  lon: number;
  units: "metric" | "imperial";
};

type Data = {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: {
    max: number;
    min: number;
  };
  uvi: number;
  visibility: number;
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
};

export type WeatherDailyResponse = {
  daily: Array<Data>;
};

export type CurrentWeatherResponse = {
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
