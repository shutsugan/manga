import { ApolloServer } from "apollo-server-lambda";

import typeDefs from "../graphql/schema";
import resolvers from "../graphql/resolvers";
import { startDb, models } from "../db";

startDb();

const context = { models };

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (request) => ({
    ...request,
    ...context,
  }),
  introspection: true,
  playground: true,
});

const handler = server.createHandler();

export { handler };
