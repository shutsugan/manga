import React from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import Header from "./Header";

test("renders learn react link", () => {
  const { getByText } = render(<Header />);
  const linkElement = getByText(/Loading/i);
  expect(linkElement).toBeInTheDocument();
});
