import {
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { WeatherResponse } from "../hooks";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsWind } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";

import { formatDate, getImgUrl, getWideSpeedInMph, msToDate } from "../utils";
import { format } from "date-fns";
import { IconAndLabel } from "./IconAndLabel";
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";

type Props = {
  data: WeatherResponse;
};

export function Weather({ data }: Props) {
  const weather = data.weather[0];

  return (
    <VStack alignItems="start">
      <HStack>
        <Icon as={MdOutlineLocationOn} boxSize="9" />
        <VStack>
          <Heading>{data?.name}</Heading>
          <Text> {format(new Date(), "eeee '•' h':'mma ")} </Text>
        </VStack>
      </HStack>

      <HStack>
        <Flex flexDir="column">
          <Text fontSize="7xl">{Math.round(data?.main.temp) + "°F"}</Text>

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

      <SimpleGrid columns={3} spacing={5}>
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
          label={data.main.temp_max + "°F"}
        />

        <IconAndLabel
          icon={FaTemperatureLow}
          label={data.main.temp_min + "°F"}
        />
      </SimpleGrid>
    </VStack>
  );
}
