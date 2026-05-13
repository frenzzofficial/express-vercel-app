import crypto from "node:crypto";

export function generateAccessToken(userId: string) {
  return `atk_${userId}_${crypto.randomBytes(32).toString("hex")}`;
}

export function generateRefreshToken(userId: string) {
  return `rtk_${userId}_${crypto.randomBytes(64).toString("hex")}`;
}
