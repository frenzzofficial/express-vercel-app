import type { CookieOptions } from "express";

import { getCookieExpiryInDays } from "../utils/utils.app";

const isProduction =
  process.env.NODE_ENV === "production";

const baseCookieConfig: CookieOptions = {
  httpOnly: true,

  secure: isProduction,

  sameSite: isProduction
    ? "none"
    : "lax",

  path: "/",

  
};

export const accessTokenCookieOptions: CookieOptions =
  {
    ...baseCookieConfig,

    maxAge: getCookieExpiryInDays(1),
  };

export const refreshTokenCookieOptions: CookieOptions =
  {
    ...baseCookieConfig,

    maxAge: getCookieExpiryInDays(30),
  };