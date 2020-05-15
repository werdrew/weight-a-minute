const env = process.env.NODE_ENV;
require('dotenv').config({path: `./config/.env.${env}`});
require('./controller/WeightController');