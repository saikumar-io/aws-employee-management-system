const multer = require('multer');
const multerS3 = require('multer-s3');
const { s3Client, BUCKET } = require('../config/s3');

/**
 * Multer middleware configured to upload files directly to S3.
 * Stores avatars under the "avatars/" prefix in the S3 bucket.
 */
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: BUCKET,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const uniqueName = `avatars/${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and WebP images are allowed'));
    }
  },
});

module.exports = { upload };
