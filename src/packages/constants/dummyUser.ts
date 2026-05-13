import bcrypt from "bcryptjs";
import { envDemoUserConfig } from "../env/env.demoUser";

export interface DummyUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

const demoPassword = bcrypt.hashSync(envDemoUserConfig.DEMO_USER_PASSWORD, 10);

export const dummyUsers: DummyUser[] = [
  {
    id: envDemoUserConfig.DEMO_USER_ID,
    name: envDemoUserConfig.DEMO_USER_NAME,
    email: envDemoUserConfig.DEMO_USER_EMAIL,
    password: demoPassword,
  },
];
