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
} from "@chakra-ui/react";
import { useWeather } from "../hooks";
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
import { useMemo } from "react";

export function CurrentWeather() {
  const [location] = useAtom(locationAtom);
  const [units] = useAtom(unitsAtom);

  const isCelsius = useMemo(() => units === Units.celsius, [units]);

  const { data, isLoading, error } = useWeather({
    lat: location.latitude,
    lon: location.longitude,
    units: isCelsius ? "metric" : "imperial",
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !data) {
    return <GenericError />;
  }

  const weather = data.weather[0];
  const unitsLabel = isCelsius ? " °C" : " °F";
  //

  return (
    <VStack alignItems="start" w="full">
      <HStack>
        <Icon as={MdOutlineLocationOn} boxSize="9" />
        <VStack>
          <Heading>{data?.name}</Heading>
          <Text> {format(new Date(), "eeee '•' h':'mma ")} </Text>
        </VStack>
      </HStack>

      <HStack w="full" justifyContent="space-between">
        <Flex flexDir="column">
          <Flex align="center">
            <Text fontSize="6xl">{Math.round(data?.main.temp)}</Text>
            <CelsiusOrFahrenheit />
          </Flex>

          <Text minW="full" textTransform="capitalize" isTruncated>
            {weather.description}
          </Text>
        </Flex>

        <Image
          borderRadius="full"
          boxSize="150px"
          src={getImgUrl(weather.icon ?? "")}
          alt={weather.main}
        />
      </HStack>

      <SimpleGrid
        justifyContent="center"
        w="full"
        columns={{ base: 2, lg: 3 }}
        spacing={10}
      >
        <IconAndLabel
          icon={BsWind}
          label={getWindSpeed(data.wind.speed, units)}
        />

        <IconAndLabel
          icon={BsFillSunriseFill}
          label={formatDate(msToDate(data.sys.sunrise))}
        />
        <IconAndLabel
          icon={BsFillSunsetFill}
          label={formatDate(msToDate(data.sys.sunset))}
        />

        <IconAndLabel icon={WiHumidity} label={data.main.humidity + "%"} />

        <IconAndLabel
          icon={FaTemperatureHigh}
          label={data.main.temp_max + unitsLabel}
        />

        <IconAndLabel
          icon={FaTemperatureLow}
          label={data.main.temp_min + unitsLabel}
        />
      </SimpleGrid>
    </VStack>
  );
}
