import { Flex, Text } from "@chakra-ui/react";

export function GenericError() {
  return (
    <Flex flexDir="column" align="center" w="full">
      <Text>Oops! Something went wrong. Please try again later</Text>
    </Flex>
  );
}
