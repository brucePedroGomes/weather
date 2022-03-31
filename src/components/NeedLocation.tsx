import { Heading, VStack } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { ReactNode, useEffect, useState } from "react";
import { locationAtom } from "../atoms";

export function NeedLocation({ children }: { children: ReactNode }) {
  const [permission, setPermission] = useState<PermissionState>("denied");

  const [location, setLocation] = useAtom(locationAtom);

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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, [setLocation]);

  useEffect(() => {
    async function getPermission() {
      if (navigator.permissions) {
        const { state } = await navigator.permissions.query({
          name: "geolocation",
        });
        setPermission(state);
      }
    }
    getPermission();
  }, []);

  if (location.latitude || permission === "granted") {
    return <>{children}</>;
  }

  const hasSupport = Boolean(navigator.geolocation);

  const message = !hasSupport
    ? "Your browser does not support Geolocation"
    : "We need your location";

  return (
    <VStack>
      <Heading>{message}</Heading>
    </VStack>
  );
}
