'use strict';

const SparkPost = require('sparkpost');
const config = require('config');

const SPARKPOST_API_KEY = config.get('gpc.sparkpostKey');
const RECIPIENT_EMAIL = config.get('gpc.recipientEmail');
const RECIPIENT_NAME = config.get('gpc.recipientName');
const FROM_EMAIL = config.get('gpc.fromEmail');
const SUBJECT = config.get('gpc.subject');

const buildMessage = (firstName = '', lastName = '', email = '', subject = '', message) => {
  return `From: ${firstName} ${lastName} ${email}\nSubject: ${subject}\n\nMessage: ${message}`;
};

const sendEmail = ({ email, firstName, lastName, subject, message }) => {
  const client = new SparkPost(SPARKPOST_API_KEY);
  const constructedMessage = buildMessage(firstName, lastName, email, subject, message);
  return client.transmissions.send({
    content: {
      from: FROM_EMAIL,
      subject: SUBJECT,
      text: constructedMessage
    },
    recipients: [
      {
        address: RECIPIENT_EMAIL,
        name: RECIPIENT_NAME
      }
    ]
  })
  .then(data => {
    return data;
  })
  .catch((err) => {
    console.log('SPARKPOST ERROR', err);
    throw new(err);
  });
};

module.exports = {
  sendEmail
};
