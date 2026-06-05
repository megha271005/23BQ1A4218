import dotenv from "dotenv";

dotenv.config();

const env = {
  port: Number.parseInt(process.env.PORT ?? "3000", 10),
  authUrl: process.env.AUTH_URL,
  depotsUrl: process.env.DEPOTS_URL,
  vehiclesUrl: process.env.VEHICLES_URL,
  logApiUrl: process.env.LOG_API_URL,
  logApiTimeoutMs: Number.parseInt(process.env.LOG_API_TIMEOUT_MS ?? "20000", 10),
  logApiToken: process.env.LOG_API_TOKEN,
  authEmail: process.env.AUTH_EMAIL,
  authName: process.env.AUTH_NAME,
  authRollNo: process.env.AUTH_ROLLNO,
  authAccessCode: process.env.AUTH_ACCESSCODE,
  authClientId: process.env.AUTH_CLIENTID,
  authClientSecret: process.env.AUTH_CLIENTSECRET,
};

export default env;