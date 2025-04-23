import { makeExecutableSchema } from "@graphql-tools/schema";
import { userAuthTypeDefs } from "../../modules/graphql/userAuth/typeDefs";
import { userAuthResolvers } from "../../modules/graphql/userAuth/resolvers";
export const schema = makeExecutableSchema({
  typeDefs: [userAuthTypeDefs],
  resolvers: [userAuthResolvers],
});
