import { Flex, Icon, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { IconType } from "react-icons";
import { Units, unitsAtom } from "../atoms";

type Props = {
  temp: number;
  color: "red.500" | "blue.400";
  icon: IconType;
};

export function Temp({ temp, color, icon }: Props) {
  const [units] = useAtom(unitsAtom);

  const unitsLabel = units === Units.celsius ? " °C" : " °F";

  return (
    <Flex align="center">
      <Icon as={icon} color={color} />
      <Flex>
        <Text fontWeight="bold">{Math.round(temp)}</Text>
        <Text fontSize="small">{unitsLabel}</Text>
      </Flex>
    </Flex>
  );
}
