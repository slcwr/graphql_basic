import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>
  </ApolloProvider>
);
