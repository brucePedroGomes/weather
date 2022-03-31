import { Divider, VStack } from "@chakra-ui/react";

import { CurrentWeather } from "../components/";
import { DailyWeather } from "../components/DailyWeather";

export function Home() {
  return (
    <VStack bgColor="gray.700" borderRadius="30px" p="6">
      <CurrentWeather />
      <Divider height="6" display={["flex"]} />
      <DailyWeather />
    </VStack>
  );
}
