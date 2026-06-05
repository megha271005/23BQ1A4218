import axios from "axios";
import env from "../config/env.js";
import { safeLog } from "../middleware/logger.js";

export async function getAuthToken() {
  if (!env.authUrl) {
    throw new Error("AUTH_URL is missing in environment configuration.");
  }

  const payload = {
    email: env.authEmail,
    name: env.authName,
    rollNo: env.authRollNo,
    accessCode: env.authAccessCode,
    clientID: env.authClientId,
    clientSecret: env.authClientSecret,
  };

  try {
    const response = await axios.post(env.authUrl, payload);
    const { token_type: tokenType, access_token: accessToken } = response.data ?? {};

    if (!tokenType || !accessToken) {
      throw new Error("Auth response missing token_type or access_token.");
    }

    await safeLog("backend", "info", "service", "Auth token retrieved successfully");

    return `${tokenType} ${accessToken}`;
  } catch (error) {
    await safeLog("backend", "error", "service", "Auth token request failed");
    throw error;
  }
}