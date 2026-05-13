import type { CookieOptions } from "express";
import { getCookieExpiryInDays } from "./utils.app";

const isProduction = process.env.NODE_ENV === "production";

export const accessTokenCookieOptions: CookieOptions = {
  httpOnly: true,

  secure: isProduction,

  sameSite: isProduction ? "none" : "lax",

  maxAge: getCookieExpiryInDays(1), // 1 day

  path: "/",
};

export const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,

  secure: isProduction,

  sameSite: isProduction ? "none" : "lax",

  maxAge: getCookieExpiryInDays(30), // 30 days

  path: "/",
};
