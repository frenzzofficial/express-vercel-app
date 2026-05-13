import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { dummyUsers } from "../../packages/constants/dummyUser";

export async function registerUser(email: string, password: string, name: string) {
  const existingUser = dummyUsers.find((u) => u.email === email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = {
    id: randomUUID(),
    email,
    password: hashedPassword,
    name,
  };

  dummyUsers.push(user);

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

export async function loginUser(email: string, password: string) {
  const user = dummyUsers.find((u) => u.email === email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Invalid credentials");
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}
