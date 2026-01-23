import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  serviceName: process.env.SERVICE_NAME || "user-service",
  port: process.env.PORT,

  jwt: {
    access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
  },

  internal_service_secret: process.env.INTERNAL_SERVICE_SECRET,

  allowed_origins: process.env.ALLOWED_ORIGINS,

  user_client_url: process.env.USER_CLIENT_URL,
  seller_client_url: process.env.SELLER_CLIENT_URL,
} as const;
