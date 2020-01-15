import { UserInputError } from 'apollo-server';
import * as Yup from 'yup';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

import {
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoRefreshToken,
} from 'amazon-cognito-identity-js';

import AWS from '../../config/aws';
import Pool from '../../config/pool';
import jwk from '../../config/auth';

function authCallbacks(resolve, reject) {
  return {
    onSuccess: async session => {
      return resolve(session);
    },
    onFailure: err => {
      reject(err);
    },
  };
}

async function authenticateUser(authenticationDetails, cognitoUser) {
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(
      authenticationDetails,
      authCallbacks(resolve, reject)
    );
  });
}

export async function registerUser(_, { input }) {
  const schema = Yup.object().shape({
    phone: Yup.string().required(),
    username: Yup.string()
      .email()
      .required(),
    password: Yup.string().required(),
  });

  await schema.validate(input).catch(err => {
    throw new UserInputError(err.name, { ...err.errors });
  });

  const { phone, username, password } = input;

  const attributeList = [];

  const dataEmail = {
    Name: 'email',
    Value: username,
  };

  const dataPhoneNumber = {
    Name: 'phone_number',
    Value: phone,
  };

  const attributeEmail = new CognitoUserAttribute(dataEmail);
  const attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);

  attributeList.push(attributeEmail);
  attributeList.push(attributePhoneNumber);

  try {
    const cognito = await promisify(Pool.signUp.bind(Pool))(
      username,
      password,
      attributeList,
      null
    );

    const { userSub, userConfirmed } = cognito;
    return { id: userSub, username, password, phone, userConfirmed };
  } catch ({ name, message }) {
    throw new UserInputError(name, { message });
  }
}

export async function confirmUserRegistration(_, { input }) {
  const schema = Yup.object().shape({
    username: Yup.string()
      .email()
      .required(),
    code: Yup.string().required(),
  });

  await schema.validate(input).catch(err => {
    throw new UserInputError(err.name, { ...err.errors });
  });

  const { username, code } = input;

  const userData = {
    Username: username,
    Pool,
  };

  const cognitoUser = new CognitoUser(userData);
  try {
    await promisify(cognitoUser.confirmRegistration.bind(cognitoUser))(
      code,
      true
    );
    return { username };
  } catch ({ name, message }) {
    throw new UserInputError(name, { message });
  }
}

export async function resendConfirmationCode(_, { input }) {
  const schema = Yup.object().shape({
    username: Yup.string()
      .email()
      .required(),
  });

  await schema.validate(input).catch(err => {
    throw new UserInputError(err.name, { ...err.errors });
  });

  const { username } = input;

  const userData = {
    Username: username,
    Pool,
  };

  const cognitoUser = new CognitoUser(userData);
  await promisify(cognitoUser.resendConfirmationCode.bind(cognitoUser))();
  return { username };
}

export async function checkAccess(accessToken) {
  const [, token] = accessToken.split(' ');

  if (!token) {
    return null;
  }

  try {
    const pem = await jwkToPem(jwk[1]);

    const tokenResponse = await promisify(jwt.verify)(token, pem, {
      algorithms: ['RS256'],
    });

    const cognito = new AWS.CognitoIdentityServiceProvider();
    const user = await promisify(cognito.getUser.bind(cognito))({
      AccessToken: token,
    });

    const { sub } = tokenResponse;
    return { ...user, sub };
  } catch (err) {
    return null;
  }
}

export async function createSession(_, { input }) {
  const schema = Yup.object().shape({
    username: Yup.string()
      .email()
      .required(),
    password: Yup.string().required(),
  });

  await schema.validate(input).catch(err => {
    throw new UserInputError(err.name, { ...err.errors });
  });

  const { username, password } = input;

  const authenticationData = {
    Username: username,
    Password: password,
  };

  const userData = {
    Username: username,
    Pool,
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);
  const cognitoUser = new CognitoUser(userData);

  try {
    const response = await authenticateUser(authenticationDetails, cognitoUser);
    const accessToken = response.accessToken.jwtToken;
    const expiration = response.accessToken.payload.exp;
    const { sub } = response.accessToken.payload;
    const refreshToken = response.refreshToken.token;
    return { accessToken, expiration, username, sub, refreshToken };
  } catch ({ name, message }) {
    throw new UserInputError(name, { message });
  }
}

export async function refreshSession(_, { input }) {
  const schema = Yup.object().shape({
    token: Yup.string().required(),
    username: Yup.string()
      .email()
      .required(),
  });

  await schema.validate(input).catch(err => {
    throw new UserInputError(err.name, { ...err.errors });
  });

  const { username, token } = input;

  const userData = {
    Username: username,
    Pool,
  };

  const cognitoUser = new CognitoUser(userData);

  const tokenToRefresh = new CognitoRefreshToken({
    RefreshToken: token,
  });

  try {
    const response = await promisify(
      cognitoUser.refreshSession.bind(cognitoUser)
    )(tokenToRefresh);

    const accessToken = response.accessToken.jwtToken;
    const expiration = response.accessToken.payload.exp;
    const { sub } = response.accessToken.payload;
    const refreshToken = response.refreshToken.token;
    return { accessToken, expiration, username, sub, refreshToken };
  } catch ({ name, message }) {
    throw new UserInputError(name, { message });
  }
}
