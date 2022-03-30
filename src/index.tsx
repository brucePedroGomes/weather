import * as ReactDOMClient from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { App } from "./App";
import { queryClient } from "./services";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles";
import React from "react";

const rootElement = document.getElementById("root")!;

const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
