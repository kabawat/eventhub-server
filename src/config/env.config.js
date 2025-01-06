require('dotenv').config(); // Load environment variables from .env file

const SECRET = {
    ENVIRONMENT: process.env.ENVIRONMENT,

    JWT_ADMIN_SECRET: process.env.JWT_ADMIN_SECRET,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_VERIFY_SECRET: process.env.JWT_VERIFY_SECRET,

    MONGODB_URI_DEV: process.env.MONGODB_URI_DEV,
    MONGODB_URI: process.env.MONGODB_URI,

    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASS,

    SERVER_URL: process.env.SERVER_URL,
    PORT: process.env.PORT,

    ADMIN_EMAIL_HASH: process.env.ADMIN_EMAIL_HASH,
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
};

module.exports = SECRET;
