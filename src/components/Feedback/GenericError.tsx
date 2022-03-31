import { Flex, Icon, Text } from "@chakra-ui/react";
import { BiErrorAlt } from "react-icons/bi";

export function GenericError() {
  return (
    <Flex flexDir="column" align="center" w="full">
      <Icon as={BiErrorAlt} boxSize="36" />
      <Text fontSize={["xl", "3xl"]}>Oops! Something went wrong.</Text>
      <Text fontSize={["sm", "2xl"]}>Please try again later.</Text>
    </Flex>
  );
}
