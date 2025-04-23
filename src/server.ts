import { ApolloServer } from "apollo-server";
import { schema } from "./shared/graphql/schema";

export async function startServer() {
  const server = new ApolloServer({ schema });
  const { url } = await server.listen();
  console.log(`🚀 Server ready at ${url}`);
}
