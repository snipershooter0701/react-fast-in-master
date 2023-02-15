const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const S3Multer = {};

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_KEY_ID,
    secretAccessKey: process.env.S3_ACCESS_KEY,
});

S3Multer.uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'feast-in',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString() + '-' + file.originalname);
        },
    }),
});

S3Multer.deleteS3Object = (keys) => {
    s3.deleteObjects(
        {
            Bucket: 'feast-in',
            Delete: {
                Objects: keys,
            },
        },
        (err, data) => {
            if (err) throw err;
            return data;
        }
    );
};

module.exports = S3Multer;
