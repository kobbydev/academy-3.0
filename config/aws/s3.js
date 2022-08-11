import { S3 as _S3 } from 'aws-sdk';
import config from '../env';

const {
  TEMPORAL_PROJECT_ACCESS_KEY_ID,
  INSTRAIL_AWS_BUCKET_NAME,
  TEMPORAL_PROJECT_SECRET_ACCESS_KEY } = config;
const S3 = new _S3({
  accessKeyId: TEMPORAL_PROJECT_ACCESS_KEY_ID,
  secretAccessKey: TEMPORAL_PROJECT_SECRET_ACCESS_KEY,
  ACL: 'public-read'
});

export default { INSTRAIL_AWS_BUCKET_NAME, S3 };
