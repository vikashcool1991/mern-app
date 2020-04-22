const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

module.exports = {
  upload: multer({
    storage: multerS3({
      s3,
      async bucket(req, file, cb) {
        cb(null, '');
      },
      acl: 'public-read',
      metadata(req, file, cb) {
        cb(null, {
          fieldName: file.fieldname,
        });
      },
      key(req, file, cb) {
        cb(null, file.originalname);
      },
    }),
  }).single('file'),

  getSignedUrl: async (urlParams) => {
    const url = s3.getSignedUrl('getObject', urlParams);
    return url;
  },
};