const express = require('express');
const { default: weather_get } = require('../controllers/weather_controllers.cjs');


const routes = express.Router();

routes.get('/', weather_get);

module.exports = routes;