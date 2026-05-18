const { S3Client } = require('@aws-sdk/client-s3');

// AWS S3 client configured via IAM credentials
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId:     process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

module.exports = { s3Client, BUCKET: process.env.S3_BUCKET_NAME };
