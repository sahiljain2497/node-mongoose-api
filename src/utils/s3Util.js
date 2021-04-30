const AWS = require('aws-sdk');
const sharp = require('sharp');

exports.connection = () => new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

exports.publicParams = (key = null, body = null, contenttype = null) => ({
  Bucket: process.env.AWS_BUCKET,
  Key: key,
  Body: body,
  ContentType: contenttype,
  ACL: 'public-read',
});

exports.resizeAndUpload = (image, path = 'images', size = 200) => new Promise((resolve, reject) => {
  (async () => {
    try {
      const imageBuffer = await sharp(image.path).resize(size).toBuffer();
      const s3 = this.connection();
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: `${path}/${new Date().getTime()}_${image.name}`,
        Body: imageBuffer,
        ContentType: image.type,
        ACL: 'public-read',
      };
      const result = await s3.upload(params).promise();
      resolve(result.Location);
    } catch (error) {
      reject(error);
    }
  })();
});
