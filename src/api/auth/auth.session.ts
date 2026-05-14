import type { Response } from "express";

import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "../../packages/utils/utils.constant";

import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../../packages/middlewares/cookies.js";

import { generateAccessToken, generateRefreshToken } from "../../packages/utils/utils.token.js";

export const createAuthSession = (res: Response, userId: string) => {
  const accessToken = generateAccessToken(userId);

  const refreshToken = generateRefreshToken(userId);

  res.cookie(ACCESS_TOKEN_COOKIE, accessToken, accessTokenCookieOptions);

  res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, refreshTokenCookieOptions);

  return {
    accessToken,
    refreshToken,
  };
};

export const clearAuthSession = (res: Response) => {
  res.clearCookie(ACCESS_TOKEN_COOKIE);

  res.clearCookie(REFRESH_TOKEN_COOKIE);
};
