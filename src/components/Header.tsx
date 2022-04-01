import { Flex, Heading, HStack, Icon, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { RefetchButton } from "./RefetchButton";
import { MdOutlineLocationOn } from "react-icons/md";

type Props = {
  city: string;
};

export function Header({ city }: Props) {
  return (
    <HStack justifyContent="space-between" w="full" isTruncated>
      <Flex flexDir="column">
        <Flex align="center">
          <Icon as={MdOutlineLocationOn} boxSize="8" />
          <Heading>{city}</Heading>
        </Flex>

        <Text paddingLeft="6" fontSize="sm">
          {format(new Date(), "eeee '•' h':'mma ")}{" "}
        </Text>
      </Flex>
      <RefetchButton />
    </HStack>
  );
}
