import 'dotenv/config';
// import Logger from "./utils/services/logger";

export const api_url = '/api/v1';

// export const logger = new Logger("edge-mono");
export const {
  PORT,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_IN,
  NODE_ENV,
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_INITDB_DATABASE,
  RABBITMQ_PASS,
  SECRET_KEY,
} = process.env;

export const _prod = NODE_ENV === 'production';

export const mongoDB = process.env.MONGO_INITDB_DATABASE || 'authDB';
export const mongoPort = process.env.MONGO_DB_PORT || 27017;

// MONGO_URL=mongodb://admin:root-pass-secr@mongodb:27017/edgeDB?authsource=admin
//`mongodb://localhost:${mongoPort}`
export const mongoDbConnectionString =
  process.env.NODE_ENV === 'development'
    ? `mongodb://localhost:${mongoPort}`
    : `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.0ihfl.mongodb.net/test?retryWrites=true&w=majority`;
