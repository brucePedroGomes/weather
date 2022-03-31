import { Spinner, VStack } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { GenericError } from "../components";
import { Weather } from "../components/Weather";
import { useWeather } from "../hooks";

export function Home() {
  const [position, setPosition] = useState<GeolocationPosition>();

  const { data, isLoading, error } = useWeather({
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

  if (error) {
    return <GenericError />;
  }

  return (
    <VStack>
      {isLoading && <Spinner />}
      {data && <Weather data={data} />}
    </VStack>
  );
}
