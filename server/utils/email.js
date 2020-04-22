const nodemailer = require('nodemailer');
const path = require('path');
const AWS = require('aws-sdk');

const label = { label: path.basename(__filename) };

module.exports = {
  sendMail(options) {
    const mailOptions = {
      from: process.env.user, // sender address
      to: options.to || process.env.to, // list of receivers
      subject: 'Sample account verification.', // Subject line
      html: options.html || '<p>Verfication link</p>', // plain text body
    };
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.user,
        pass: process.env.pass,
      },
    });
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) logger.info(err, label);
      else logger.info(info, label);
    });
  },

  sendSES(to, source, callback) {
    AWS.config.update({
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
      region: process.env.region,
    });

    const ses = new AWS.SES({
      apiVersion: '2010-12-01',
    });
    const params = {
      Destination: {
        ToAddresses: to, // array
      },
      //   ConfigurationSetName: "", // to receive notification from sns
      Message: {
        Body: {
          Html: {
          // HTML Format of the email
            Charset: 'UTF-8',
            Data: '<html><body><h1>Hello  Charith</h1><p style=\'color:red\'>Sample description</p> <p>Time 1517831318946</p></body></html>',
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'Hello Charith Sample description time 1517831318946',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Test email',
        },
      },
      Source: source, // string | sender email
    };

    const sendEmail = ses.sendEmail(params).promise();

    sendEmail
      .then((data) => {
        callback(null, data);
      })
      .catch((error) => {
        callback(error);
      });
  },
};