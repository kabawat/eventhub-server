const mongoose = require('mongoose');
const SECRET = require('./env.config');
const { ENVIRONMENT, MONGODB_URI, MONGODB_URI_DEV } = SECRET
const URI = () => {
    if (ENVIRONMENT == "development") return MONGODB_URI_DEV
    else return MONGODB_URI;
}

const connectDB = async () => {
    try {
        mongoose.connect(URI()).then((res) => {
            console.log('MongoDB connected successfully');
        }).catch((err) => {
            console.log('Error connecting to MongoDB:', err);
        });
    } catch (error) {

    }
};

module.exports = connectDB;