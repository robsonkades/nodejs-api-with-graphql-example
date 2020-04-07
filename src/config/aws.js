import * as AWS from 'aws-sdk';

const credentials = {
  accessKeyId: '',
  secretAccessKey: '',
};

AWS.config.update({ credentials, region: 'us-east-1' });

export const S3 = new AWS.S3({ signatureVersion: 'v4' });

export default AWS;
