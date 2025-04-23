import { loginUser } from "../../application/Login";
import { registerUser } from "../../application/RegisterUser";
import { UserPrismaRepository } from "../../infra/prisma/UserPrismaRepository";

const userRepo = new UserPrismaRepository();

export const userAuthResolvers = {
  Query: {
    users: () => userRepo.findAll(),
  },
  Mutation: {
    registerUser: (
      _: any,
      args: {
        input: {
          name: string;
          email: string;
          password: string;
          confirmPassword: string;
        };
      }
    ) => registerUser(args.input),
    login: (
      _: any,
      args: {
        input: {
          email: string;
          password: string;
        };
      }
    ) => loginUser(args.input),
  },
};
