import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;
const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID || "";
const FACEBOOK_CLIENT_SECRECT = process.env.FACEBOOK_CLIENT_SECRECT || "";

export {
    PORT,
    FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRECT
}