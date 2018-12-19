'use strict';

const flag = (key) => ({ __name: key, __format: 'json' });

module.exports = {
  server: {
    port: 'PORT'
  },
  gpc: {
    accessControl: 'GPC_ALLOWED_ORIGN',
    fromEmail: 'GPC_FROM_EMAIL',
    recipientEmail: 'GPC_RECIPIENT_EMAIL',
    recipientName: 'GPC_RECIPIENT_NAME',
    sparkpostKey: 'GPC_SPARKPOST_API_KEY',
    subject: 'GPC_SUBJECT'
  }
};
