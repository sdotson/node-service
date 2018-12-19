'use strict';

const sparkpostService = require('../services/sparkpost');

const sendEmail = async (req, res) => {
  try {
    const { errors, results} = await sparkpostService.sendEmail(req.body);
    if (!errors) {
      res.status(201).send({
        message: 'success',
        results: results
      });
    } else {
      res.status(500).send({
        message: 'failure',
        errors: errors
      });
    }
  } catch (err) {
    console.log('err', err);
    res.status(500).send({
      message: 'failure',
      err
    });
  }
}

module.exports = {
  sendEmail
};
