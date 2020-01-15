import { CognitoUserPool } from 'amazon-cognito-identity-js';

global.fetch = require('node-fetch');

const poolData = {
  UserPoolId: 'us-east-1_Bq1Dy6ngB',
  ClientId: '7ftu0603tictvp0e0comfbfgbu',
};

export default new CognitoUserPool(poolData);
