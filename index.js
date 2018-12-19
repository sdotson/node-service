'use strict';

const http = require('http');
require('http-shutdown').extend();

const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require("express-rate-limit");
const { errors } = require('celebrate');

const app = express();

const gpcRoutes = require('./src/gpc/email');

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("common"));  
app.use(errors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// GPC endpoints
app.use(gpcRoutes);

const port = config.get('server.port');
const server = http.createServer(app).listen(port).withShutdown();

console.log(`server listening on port ${port}`);
process.on('SIGTERM', () => {
  console.log('shutdown requested');
  server.shutdown(() => {
    console.log('shutdown complete');
    process.exit(0);
  });
});

module.exports = app;
