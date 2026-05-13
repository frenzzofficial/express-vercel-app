import { betterAuth } from "better-auth";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // refresh daily
  },

  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false,
    },
  },

  socialProviders: {
    // future
    // google: {},
    // discord: {},
  },
});

export const ACCESS_TOKEN_COOKIE = "access_token";

export const REFRESH_TOKEN_COOKIE = "refresh_token";
