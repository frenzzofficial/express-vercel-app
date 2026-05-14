import bcrypt from "bcryptjs";
import { envDefaultUserConfig } from "../env/env.user";

export interface DefaultUserType {
  id: string;
  fullname: string;
  email: string;
  password: string;
}

const defaultPassword = bcrypt.hashSync(envDefaultUserConfig.DEFAULT_USER_PASSWORD, 10);

export const UsersList: DefaultUserType[] = [
  // Demo/default user for tesing purposes
  {
    id: envDefaultUserConfig.DEFAULT_USER_ID,
    fullname: envDefaultUserConfig.DEFAULT_USER_FULLNAME,
    email: envDefaultUserConfig.DEFAULT_USER_EMAIL,
    password: defaultPassword,
  },
];
