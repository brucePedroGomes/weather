import { Heading, Spinner, VStack } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useWeather } from "../hooks";

export function Home() {
  const [position, setPosition] = useState<GeolocationPosition>();

  const { data, error, isLoading } = useWeather({
    lat: position?.coords.latitude ?? 0,
    lon: position?.coords.longitude ?? 0,
  });

  useEffect(() => {
    function success(position: GeolocationPosition) {
      setPosition(position);
    }

    function error(error: GeolocationPositionError) {
      return console.error(error);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return (
    <VStack>
      <Heading>Weather</Heading>
      {isLoading && <Spinner />}
    </VStack>
  );
}
