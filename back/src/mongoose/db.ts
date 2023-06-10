const Mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI;
const SUCCESS_MESSAGE = "Connected to database → OK";

let isConnected = false;

const connect = async () => {
    try {
        if (isConnected) return SUCCESS_MESSAGE;

        console.log('Opening connection to DB...');
        await Mongoose.connect(mongoUri);

        isConnected = true;
        return SUCCESS_MESSAGE;
    } catch (error) {
        console.log('Error while trying to connect to database =>' + error);
        return null;
    }
}

module.exports = {
    connect
}
