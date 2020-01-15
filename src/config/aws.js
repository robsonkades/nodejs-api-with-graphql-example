import * as AWS from 'aws-sdk';

const credentials = {
  accessKeyId: 'AKIA55VDEPC355ZEY2BB',
  secretAccessKey: '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',
};

AWS.config.update({ credentials, region: 'us-east-1' });

export const S3 = new AWS.S3({ signatureVersion: 'v4' });

export default AWS;
