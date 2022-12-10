'use strict';

// Import required dependencies
require('dotenv').config()

const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

// Connect to the database
const db = require('./database/db');

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
const authRoutes = require('./routes/authRoutes');

// Routes
app.use("/", uiRoutes);
app.use("/api", apiRoutes);
app.use("/authentication", authRoutes);

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});