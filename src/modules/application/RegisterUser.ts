import bcrypt from "bcrypt";
import { UserPrismaRepository } from "../infra/prisma/UserPrismaRepository";

interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const userRepository = new UserPrismaRepository();

export async function registerUser(data: RegisterUserDTO) {
  try {
    console.log("Registering user", data);
    if (data.password !== data.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    console.log("Hashed password", hashedPassword);
    data.password = hashedPassword;
    console.log("Data after hashing", data);
    return userRepository.create(data);
  } catch (error: any) {
    throw new Error(`Error registering user: ${error?.message}`);
  }
}
