import type { Request, Response } from "express";
import { loginUser, registerUser } from "./auth.services";
import { SignupRequestBody, SignupResponse } from "../../types/auth";
import { validateSchema } from "../../packages/utils/ValidateSchema";
import { signinSchema, signupSchema } from "../../packages/schemas/schema.auth";

import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../../packages/middlewares/cookies";

import { generateAccessToken, generateRefreshToken } from "../../packages/utils/utils.token";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "../../packages/utils/utils.constant";

/* -------------------------------------------------------------------------- */
/*                              SIGNUP CONTROLLER                             */
/* -------------------------------------------------------------------------- */

export async function signup(
  req: Request<Record<string, never>, SignupResponse, SignupRequestBody>,

  res: Response<SignupResponse>
): Promise<Response<SignupResponse>> {
  try {
    const validation = validateSchema(signupSchema, req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        // field: validation.field,
        message: validation.message,
      });
    }

    const { email, password, fullname } = validation.data;

    /* ---------------------------------------------------------------------- */
    /*                               REGISTER USER                            */
    /* ---------------------------------------------------------------------- */

    const user = await registerUser(email, password, fullname ?? "Anonymous User");

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
          fullname: user.fullname,
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
    const validation = validateSchema(signinSchema, req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        // field: validation.field,
        message: validation.message,
      });
    }

    const { email, password } = validation.data;

    /* ---------------------------------------------------------------------- */
    /*                               LOGIN USER                            */
    /* ---------------------------------------------------------------------- */

    const user = await loginUser(email, password);

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

    return res.status(201).json({
      success: true,

      message: "User loggedin successfully",

      data: {
        user: {
          id: user.id,
          email: user.email,
          fullname: user.fullname,
        },
      },
    });
  } catch (error) {
    console.error("[AUTH_SIGNIN_ERROR]", error);

    return res.status(500).json({
      success: false,

      message: error instanceof Error ? error.message : "Internal server error",
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
