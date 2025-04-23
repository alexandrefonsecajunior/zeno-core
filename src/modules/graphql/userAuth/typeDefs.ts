import { gql } from "apollo-server";

export const userAuthTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type LoginResponse {
    token: String!
    user: User!
  }

  input UserRegisterInput {
    name: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    registerUser(input: UserRegisterInput): User!
    login(input: UserLoginInput): LoginResponse!
  }
`;
