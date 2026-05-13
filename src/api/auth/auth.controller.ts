import type { Request, Response } from "express";
import { loginUser, registerUser } from "./auth.services";
import { validateSignupCredentials } from "./auth.validate";
import { SignupRequestBody, SignupResponse } from "../../types/auth";

import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../../packages/middlewares/cookies";

import { generateAccessToken, generateRefreshToken } from "../../packages/utils/utils.token";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "../../packages/configs/config.better-auth";


/* -------------------------------------------------------------------------- */
/*                              SIGNUP CONTROLLER                             */
/* -------------------------------------------------------------------------- */

export async function signup(
  req: Request<Record<string, never>, SignupResponse, SignupRequestBody>,

  res: Response<SignupResponse>
): Promise<Response<SignupResponse>> {
  try {
    // const { email, password, name } = req.body;

    // const validateSignupCredentialsRes = validateSignupCredentials({email, password, name}); 

    // if (!validateSignupCredentialsRes.success) {
    //   return res.status(400).json(validateSignupCredentialsRes);
    // }

    const validation = validateSignupCredentials(req.body);

    if (!validation.success) {
      return res.status(400).json({
      success: false,
      // field: validation.field,
      message: validation.message,
      });
    }

    const { email, password, name } =validation.data;

    /* ---------------------------------------------------------------------- */
    /*                               REGISTER USER                            */
    /* ---------------------------------------------------------------------- */

    const user = await registerUser(email, password, name ?? "Anonymous User");

    /* ---------------------------------------------------------------------- */
    /*                                TOKENS                                  */
    /* ---------------------------------------------------------------------- */

    const accessToken = generateAccessToken(user.id);

    const refreshToken = generateRefreshToken(user.id);

    /* ---------------------------------------------------------------------- */
    /*                                COOKIES                                 */
    /* ---------------------------------------------------------------------- */

    res.cookie(ACCESS_TOKEN_COOKIE, accessToken, accessTokenCookieOptions);

    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, refreshTokenCookieOptions);

    /* ---------------------------------------------------------------------- */
    /*                               RESPONSE                                 */
    /* ---------------------------------------------------------------------- */

    return res.status(201).json({
      success: true,

      message: "User registered successfully",

      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
    });
  } catch (error) {
    console.error("[AUTH_SIGNUP_ERROR]", error);

    return res.status(500).json({
      success: false,

      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

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

export async function logout(_req: Request, res: Response) {
  res.clearCookie(ACCESS_TOKEN_COOKIE);

  res.clearCookie(REFRESH_TOKEN_COOKIE);

  return res.status(200).json({
    success: true,
  });
}
