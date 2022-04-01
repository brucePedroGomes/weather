import {
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";
import { useCurrentWeather } from "../hooks";

import { BsWind } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";

import { formatDate, getImgUrl, getWindSpeed, msToDate } from "../utils";

import { IconAndLabel } from "./IconAndLabel";
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { useAtom } from "jotai";
import { locationAtom, Units, unitsAtom } from "../atoms";
import { GenericError, Loading } from "./Feedback";
import { CelsiusOrFahrenheit } from "./CelsiusOrFahrenheit";

import { Header } from "./Header";

export function CurrentWeather() {
  const [location] = useAtom(locationAtom);
  const [units] = useAtom(unitsAtom);

  const { data, isLoading, error } = useCurrentWeather({
    lat: location.latitude,
    lon: location.longitude,
    units,
  })!;

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data) {
    return <GenericError />;
  }

  const weather = data.weather[0];
  const unitsLabel = units === Units.celsius ? " °C" : " °F";

  return (
    <Skeleton w="full" isLoaded={data && !isLoading}>
      <VStack alignItems="start" w="full">
        <Header city={data.name} />
        <HStack
          w="full"
          justifyContent={["space-between", "center"]}
          paddingBottom="6"
        >
          <Flex flexDir="column">
            <Flex align="center">
              <Text fontWeight="bold" fontSize="7xl">
                {Math.round(data.main.temp)}
              </Text>
              <CelsiusOrFahrenheit />
            </Flex>

            <Text minW="full" textTransform="capitalize" isTruncated>
              {weather.description}
            </Text>
          </Flex>

          <Image
            borderRadius="full"
            boxSize={["150px", "200px"]}
            src={getImgUrl(weather.icon)}
            alt={weather.main}
          />
        </HStack>

        <SimpleGrid
          justifyContent="center"
          justifyItems="center"
          w="full"
          columns={{ base: 2, lg: 3 }}
          spacing={10}
        >
          <IconAndLabel
            icon={FaTemperatureHigh}
            label={Math.round(data.main.temp_max) + unitsLabel}
          />

          <IconAndLabel
            icon={FaTemperatureLow}
            label={Math.round(data.main.temp_min) + unitsLabel}
          />

          <IconAndLabel
            icon={BsFillSunriseFill}
            label={formatDate(msToDate(data.sys.sunrise))}
          />
          <IconAndLabel
            icon={BsFillSunsetFill}
            label={formatDate(msToDate(data.sys.sunset))}
          />

          <IconAndLabel
            icon={BsWind}
            label={getWindSpeed(data.wind.speed, units)}
          />

          <IconAndLabel icon={WiHumidity} label={data.main.humidity + "%"} />
        </SimpleGrid>
      </VStack>
    </Skeleton>
  );
}
