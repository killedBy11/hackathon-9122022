'use strict';

// Import required dependencies
require('dotenv').config()

const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

// Connect to the database
const sequelize = require('./database/db');
const parkingFactory = require('./models/Parking');
const parking = parkingFactory(sequelize);


// test query
const f = async () => {
    const parks = await parking.findAll({
    atributes: ['park_id', 'latitude', 'longitude', 'active_days']
    });
    console.log("All parkings:", JSON.stringify(parks, null, 2));
}

// Configure required http headers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());
app.options('*', cors());

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const uiRoutes = require('./routes/uiRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Routes
app.use("/", uiRoutes);
app.use("/api", apiRoutes);

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});