import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserPrismaRepository } from "../infra/prisma/UserPrismaRepository";

const JWT_SECRET = process.env.JWT_SECRET || "zeno_dev_secret";

const userRepository = new UserPrismaRepository();

interface LoginDTO {
  email: string;
  password: string;
}

export async function loginUser(data: LoginDTO) {
  const { email, password } = data;
  const user = await userRepository.findByEmail(email);

  console.log("Login user", user);

  if (!user) throw new Error("Usuário não encontrado");

  if (!user.password) throw new Error("Usuário não possui senha");

  const isValid = await bcrypt.compare(password, user?.password);
  if (!isValid) throw new Error("Senha incorreta");

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

  return {
    token,
    user,
  };
}
