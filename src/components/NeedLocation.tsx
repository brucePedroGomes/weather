import { Heading, VStack } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";

export function NeedLocation({ children }: { children: ReactNode }) {
  const [permission, setPermission] = useState<PermissionState>("denied");

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

  if (permission === "granted") {
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
