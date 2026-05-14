import type { NextFunction, Request, Response } from "express";

import { ACCESS_TOKEN_COOKIE } from "../../packages/utils/utils.constant";

import { UsersList } from "../../packages/utils/defaultUser.js";
import { sendErrorResponse } from "../../packages/utils/utils.reponse.js";

/* -------------------------------------------------------------------------- */
/*                              EXTEND REQUEST                                */
/* -------------------------------------------------------------------------- */

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        fullname: string;
      };
    }
  }
}

/* -------------------------------------------------------------------------- */
/*                               AUTH GUARD                                   */
/* -------------------------------------------------------------------------- */

export const authGuard = async (
  req: Request,

  res: Response,

  next: NextFunction
): Promise<void> => {
  try {
    /* ---------------------------------------------------------------------- */
    /*                              ACCESS TOKEN                              */
    /* ---------------------------------------------------------------------- */

    const accessToken = req.cookies?.[ACCESS_TOKEN_COOKIE];

    if (!accessToken) {
      sendErrorResponse(res, 401, "Unauthorized access");

      return;
    }

    /* ---------------------------------------------------------------------- */
    /*                           TOKEN VALIDATION                             */
    /* ---------------------------------------------------------------------- */

    /**
     * Current token format:
     *
     * atk_<userId>_<randomToken>
     */

    const tokenParts = accessToken.split("_");

    if (tokenParts.length < 3) {
      sendErrorResponse(res, 401, "Invalid access token");

      return;
    }

    const userId = tokenParts[1];

    /* ---------------------------------------------------------------------- */
    /*                               FIND USER                                */
    /* ---------------------------------------------------------------------- */

    const user = UsersList.find((user) => user.id === userId);

    if (!user) {
      sendErrorResponse(res, 401, "User not found");

      return;
    }

    /* ---------------------------------------------------------------------- */
    /*                          ATTACH USER TO REQUEST                        */
    /* ---------------------------------------------------------------------- */

    req.user = {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
    };

    next();
  } catch (error) {
    console.error("[AUTH_GUARD_ERROR]", error);

    sendErrorResponse(res, 500, "Internal server error");
  }
};
