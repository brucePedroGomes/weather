import { Flex, IconButton, Text, useToast } from "@chakra-ui/react";
import { format, differenceInMinutes } from "date-fns";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { locationAtom, unitsAtom } from "../atoms";
import { useCurrentWeather, useDailyWeather } from "../hooks";

export function RefetchButton() {
  const [location] = useAtom(locationAtom);
  const [units] = useAtom(unitsAtom);
  const [refetchDate, setRefetchDate] = useState(new Date());

  const toast = useToast();

  const request = {
    lat: location.latitude,
    lon: location.longitude,
    units,
  };

  const { refetch: refetchCurrent, isFetching } = useCurrentWeather(request);

  const { refetch: refetchDaily } = useDailyWeather(request);

  function handleRefetch() {
    if (differenceInMinutes(new Date(), refetchDate) < 1) {
      toast({
        title: "Keep calm",
        description: "The last update happened in less than a minute",
        position: "top",
        isClosable: true,
      });
      return;
    }

    refetchDaily();
    refetchCurrent();
  }

  useEffect(() => {
    setRefetchDate(new Date());
  }, [isFetching]);

  return (
    <Flex flexDir={["column", "row"]} align={["end", "center"]}>
      <IconButton
        variant="unstyled"
        aria-label="refetch"
        onClick={handleRefetch}
        _focus={{ border: "none" }}
        icon={<AiOutlineReload size={24} />}
      />
      <Text fontSize={["sm", "md"]}>
        last updated on {format(refetchDate, "eee, hh:mm:ss")}{" "}
      </Text>
    </Flex>
  );
}
