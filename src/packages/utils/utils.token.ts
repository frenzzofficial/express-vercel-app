import { nanoid } from "nanoid";

import {
  ACCESS_TOKEN_LENGTH,
  ACCESS_TOKEN_PREFIX,
  REFRESH_TOKEN_LENGTH,
  REFRESH_TOKEN_PREFIX,
} from "../configs/config.better-auth";

export function generateAccessToken(userId: string) {
  return `${ACCESS_TOKEN_PREFIX}_${userId}_${nanoid(ACCESS_TOKEN_LENGTH)}`;
}

export function generateRefreshToken(userId: string) {
  return `${REFRESH_TOKEN_PREFIX}_${userId}_${nanoid(REFRESH_TOKEN_LENGTH)}`;
}
