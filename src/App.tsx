import { Container } from "@chakra-ui/react";

import { NeedLocation } from "./components";
import { Home } from "./pages";

export function App() {
  return (
    <Container
      as="main"
      pt="28"
      w="full"
      minW="96"
      maxWidth="container.sm"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <NeedLocation>
        <Home />
      </NeedLocation>
    </Container>
  );
}
