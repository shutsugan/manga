import React from "react";
import { gql, useQuery } from "@apollo/client";

export const GET_HELLO = gql`
  query GetHello {
    hello
  }
`;

const App = () => {
  const { data, loading, error } = useQuery(GET_HELLO);

  if (loading) return "Loading...";
  if (error) return "Error...";

  return <div className="App">{data.hello}</div>;
};

export default App;
