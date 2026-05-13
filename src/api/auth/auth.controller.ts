import type { Request, Response } from "express";
import { loginUser } from "./auth.services";
// import { registerUser } from "./auth.services";

import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../../packages/utils/utils.auth";

import { generateAccessToken, generateRefreshToken } from "../../packages/utils/utils.token";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "../../packages/configs/config.better-auth";

export async function signin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    const accessToken = generateAccessToken(user.id);

    const refreshToken = generateRefreshToken(user.id);

    res.cookie(ACCESS_TOKEN_COOKIE, accessToken, accessTokenCookieOptions);

    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, refreshTokenCookieOptions);

    return res.status(200).json({
      success: true,

      user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,

      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function signup(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body;

    if( !password) {
      return res.status(400).json({
        success: false,
        message: "Missing Password",  
      });
    }

    // const user = await registerUser(email, password, name);

    const user = {
      id: "user-" + Date.now(), // Simple ID generation for demo purposes
      email: email,
      name: name,
    }

    const accessToken = generateAccessToken(user.id);

    const refreshToken = generateRefreshToken(user.id);

    res.cookie(ACCESS_TOKEN_COOKIE, accessToken, accessTokenCookieOptions);

    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, refreshTokenCookieOptions);

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie(ACCESS_TOKEN_COOKIE);

  res.clearCookie(REFRESH_TOKEN_COOKIE);

  return res.status(200).json({
    success: true,
  });
}
