const { createClient } = require('redis'); // Use createClient instead of Client
const dotenv = require('dotenv');
dotenv.config();

const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_URL,
        port: process.env.REDIS_PORT
    }
});


redisClient.on('connect', () => {
    console.log('Connected to Redis server successfully.');
  });

redisClient.on('error', (error) => {
    console.error('Error connecting to Redis:', error);
});

redisClient.on('ready', () => {
    console.log('Connected to Redis database.');
}); 

module.exports = { redisClient };

