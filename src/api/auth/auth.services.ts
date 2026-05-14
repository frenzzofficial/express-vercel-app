import bcrypt from "bcryptjs";
import { UsersList } from "../../packages/constants/defaultUser";

export async function registerUser(email: string, password: string, fullname: string) {
  const existingUser = UsersList.find((u) => u.email === email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = {
    id: "user-" + Date.now(), // Simple ID generation for demo purposes
    email,
    password: hashedPassword,
    fullname,
  };

  UsersList.push(user);

  return {
    id: user.id,
    email: user.email,
    fullname: user.fullname,
  };
}

export async function loginUser(email: string, password: string) {
  const user = UsersList.find((u) => u.email === email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Invalid password");
  }

  return {
    id: user.id,
    email: user.email,
    fullname: user.fullname,
  };
}
