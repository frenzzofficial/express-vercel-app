import type { Request, Response } from "express";
// import { generateAccessToken, generateRefreshToken } from "../../packages/utils/utils.token";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "../../packages/configs/config.better-auth";
import { accessTokenCookieOptions, refreshTokenCookieOptions } from "../../packages/utils/utils.auth";


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
      id: "user-001", // Simple ID generation for demo purposes
      email: email,
      name: name,
    }

    // const accessToken = generateAccessToken(user.id);

    // const refreshToken = generateRefreshToken(user.id);

    // const accessToken = "access_token";
    // const refreshToken = "refresh_token";

    // res.cookie(ACCESS_TOKEN_COOKIE, accessToken, accessTokenCookieOptions);

    // res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, refreshTokenCookieOptions);

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