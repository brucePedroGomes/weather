import {
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
  SimpleGrid,
  Spinner,
  Skeleton,
} from "@chakra-ui/react";
import { useCurrentWeather } from "../hooks";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsWind } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";

import { formatDate, getImgUrl, getWindSpeed, msToDate } from "../utils";
import { format } from "date-fns";
import { IconAndLabel } from "./IconAndLabel";
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { useAtom } from "jotai";
import { locationAtom, Units, unitsAtom } from "../atoms";
import { GenericError } from "./Feedback";
import { CelsiusOrFahrenheit } from "./CelsiusOrFahrenheit";

export function CurrentWeather() {
  const [location] = useAtom(locationAtom);
  const [units] = useAtom(unitsAtom);

  const { data, isLoading, error } = useCurrentWeather({
    lat: location.latitude,
    lon: location.longitude,
    units,
  })!;

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !data) {
    return <GenericError />;
  }

  const weather = data.weather[0];
  const unitsLabel = units === Units.celsius ? " °C" : " °F";

  return (
    <Skeleton w="full" isLoaded={data && !isLoading}>
      <VStack alignItems="start" w="full">
        <HStack>
          <VStack>
            <Flex align="center">
              <Icon as={MdOutlineLocationOn} boxSize="8" />
              <Heading>{data.name}</Heading>
            </Flex>

            <Text paddingLeft="6" fontSize="sm">
              {format(new Date(), "eeee '•' h':'mma ")}{" "}
            </Text>
          </VStack>
        </HStack>

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
