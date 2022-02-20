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
//: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.0ihfl.mongodb.net/test?retryWrites=true&w=majority`;
: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@ec2-3-127-135-219.eu-central-1.compute.amazonaws.com:27017,ec2-52-59-218-12.eu-central-1.compute.amazonaws.com:27017,ec2-3-69-45-11.eu-central1.compute.amazonaws.com:27017/?authSource=admin&replicaSet=s0&readPreference=secondary`