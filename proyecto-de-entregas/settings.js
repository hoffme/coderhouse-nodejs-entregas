import dotenv from 'dotenv';
import minimist from 'minimist';

dotenv.config();

const args = minimist(process.argv.slice(2), {
    alias: {
        p: 'port',
        m: 'mode'
    },
    default: {
        port: 8080,
        mode: 'production'
    }
})

const PORT = args.port;
const MODE = args.mode;

const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID || "";
const FACEBOOK_CLIENT_SECRECT = process.env.FACEBOOK_CLIENT_SECRECT || "";

const EMAIL_SERVER_LOG_USERNAME = process.env.EMAIL_SERVER_LOG_USERNAME || "";
const EMAIL_SERVER_LOG_PASSWORD = process.env.EMAIL_SERVER_LOG_PASSWORD || "";

const EMAIL_SERVER_INFO_TYPE = process.env.EMAIL_SERVER_INFO_TYPE || "";
const EMAIL_SERVER_INFO_USERNAME = process.env.EMAIL_SERVER_INFO_USERNAME || "";
const EMAIL_SERVER_INFO_PASSWORD = process.env.EMAIL_SERVER_INFO_PASSWORD || "";

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "";
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
const TWILIO_SMS_NUMBER = process.env.TWILIO_SMS_NUMBER || "";

const EMAIL_ADMIN_USERNAME = process.env.EMAIL_ADMIN_USERNAME || "";
const SMS_ADMIN_NUMBER = process.env.SMS_ADMIN_NUMBER || "";

const STORAGE_METHOD = process.env.STORAGE_METHOD || (MODE === "production" ? "mongo" : "memory");

export {
    PORT,
    MODE,
    FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRECT,
    EMAIL_SERVER_LOG_USERNAME,
    EMAIL_SERVER_LOG_PASSWORD,
    EMAIL_SERVER_INFO_TYPE,
    EMAIL_SERVER_INFO_USERNAME,
    EMAIL_SERVER_INFO_PASSWORD,
    EMAIL_ADMIN_USERNAME,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_SMS_NUMBER,
    SMS_ADMIN_NUMBER,
    STORAGE_METHOD
}