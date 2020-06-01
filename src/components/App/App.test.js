import React from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import App, { GET_HELLO } from "./App";

const mocks = [
  {
    request: {
      query: GET_HELLO,
    },
    results: {
      data: {
        hello: "Hello String",
      },
    },
  },
];

test("renders learn react link", () => {
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
  const linkElement = getByText(/Loading/i);
  expect(linkElement).toBeInTheDocument();
});
