import { Center, Spinner } from "@chakra-ui/react";

export function Loading() {
  return (
    <Center pos="fixed" zIndex="10" inset="-50%" bg="blackAlpha.800">
      <Spinner size="xl" />
    </Center>
  );
}
