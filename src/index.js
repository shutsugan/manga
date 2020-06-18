import React from "react";
import { hydrate, render } from "react-dom";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

import App from "./components/App/App";
import { registerServiceWorker } from "./serviceworker";

import "./index.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: navigator.onLine
    ? new HttpLink({ uri: "/.netlify/functions/graphql" })
    : null,
});

const rootElement = document.getElementById("root");
const app = (
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);

if (rootElement.hasChildNodes()) hydrate(app, rootElement);
else render(app, rootElement);

registerServiceWorker();
