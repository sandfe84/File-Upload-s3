const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

app.post('/api/get-presigned-url', (req, res) => {
  const { filename } = req.body;

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: filename,
    Expires: 300,
    ContentType: 'image/jpeg'
  };

  const url = s3.getSignedUrl('putObject', params);
  res.json({ url });
});

app.listen(3000, () => {
  console.log('Server läuft auf Port 3000');
});
