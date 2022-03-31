import { VStack } from "@chakra-ui/react";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { locationAtom } from "../atoms";

import { CurrentWeather } from "../components/";

export function Home() {
  const [, setLocation] = useAtom(locationAtom);

  useEffect(() => {
    function success(position: GeolocationPosition) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    function error(error: GeolocationPositionError) {
      return console.error(error);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }, [setLocation]);

  return (
    <VStack bgColor="gray.700" borderRadius="30px" p="6">
      <CurrentWeather />
    </VStack>
  );
}
