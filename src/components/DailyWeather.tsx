import {
  Box,
  Divider,
  Flex,
  HStack,
  Img,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { locationAtom, unitsAtom } from "../atoms";
import { useDailyWeather } from "../hooks";
import { msToDate, getImgUrl } from "../utils";
import { Temp } from ".";

import {
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowUp,
} from "react-icons/hi";
import { GenericError } from "./Feedback";

function getWeekName(date: Date) {
  return format(date, "EEEE");
}

export function DailyWeather() {
  const [location] = useAtom(locationAtom);
  const [units] = useAtom(unitsAtom);

  const { data, isLoading, error } = useDailyWeather({
    lat: location.latitude,
    lon: location.longitude,
    units,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !data) {
    return <GenericError />;
  }

  const daily = data?.daily.slice(0, 8) ?? [];

  return (
    <SimpleGrid columns={[2, 4]} flexDir={["column", "row"]} w="full">
      {daily.map((d) => (
        <Box padding="6" key={d.dt}>
          <VStack>
            <Text>{getWeekName(msToDate(d.dt))}</Text>

            <Img src={getImgUrl(d.weather[0].icon)} height="16" />
            <HStack>
              <Temp
                temp={d.temp.max}
                color="red.500"
                icon={HiOutlineArrowNarrowUp}
              />
              <Temp
                temp={d.temp.min}
                color="blue.400"
                icon={HiOutlineArrowNarrowDown}
              />
            </HStack>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
}
