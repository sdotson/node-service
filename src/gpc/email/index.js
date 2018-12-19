
'use strict';

const express = require('express');
const { celebrate } = require('celebrate');
const config = require('config');
const cors = require('cors');
const router = express.Router();
const emailController = require('./emailController');
const { sendEmailJoi } = require('./validations');

router.post('/gpc/v1/email',
  celebrate(sendEmailJoi),
  cors({  
    origin: [config.get('gpc.accessControl')],
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }),
  emailController.sendEmail
);

module.exports = router;
