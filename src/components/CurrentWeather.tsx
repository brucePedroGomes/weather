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
  Divider,
} from "@chakra-ui/react";
import { useWeather } from "../hooks";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsWind } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";

import { formatDate, getImgUrl, getWideSpeedInMph, msToDate } from "../utils";
import { format } from "date-fns";
import { IconAndLabel } from "./IconAndLabel";
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { useAtom } from "jotai";
import { locationAtom } from "../atoms";
import { GenericError } from "./Feedback";

export function CurrentWeather() {
  const [location] = useAtom(locationAtom);

  const { data, isLoading, error } = useWeather({
    lat: location.latitude,
    lon: location.longitude,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !data) {
    return <GenericError />;
  }

  const weather = data.weather[0];

  return (
    <VStack alignItems="start" w="full">
      <HStack>
        <Icon as={MdOutlineLocationOn} boxSize="9" />
        <VStack>
          <Heading>{data?.name}</Heading>
          <Text> {format(new Date(), "eeee '•' h':'mma ")} </Text>
        </VStack>
      </HStack>

      <HStack>
        <Flex flexDir="column">
          <Flex align="center">
            <Text fontSize="6xl">{Math.round(data?.main.temp)}</Text>
            <Text fontSize="3xl">°C</Text>
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
          label={getWideSpeedInMph(data.wind.speed) + " mph"}
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
          label={data.main.temp_max + "°C"}
        />

        <IconAndLabel
          icon={FaTemperatureLow}
          label={data.main.temp_min + "°C"}
        />
      </SimpleGrid>
    </VStack>
  );
}
