import { UserInputError } from 'apollo-server';
import * as Yup from 'yup';
import uuidv4 from 'uuid';

import { S3 } from '../../config/aws';

async function getSignedPutObjectUrl(objectId, contentType) {
  return S3.getSignedUrlPromise('putObject', {
    Bucket: 'gatamalvada',
    Key: objectId,
    Expires: 15 * 60,
    ContentType: contentType,
    ACL: 'public-read',
  });
}

export default async function requestUpload(context, { input }) {
  const schema = Yup.object().shape({
    fileName: Yup.string().required(),
    fileType: Yup.string().required(),
    contentType: Yup.string().required(),
  });

  await schema.validate(input).catch(err => {
    throw new UserInputError(err.name, { ...err.errors });
  });

  const userContext = context.user;

  const { fileName, fileType, contentType } = input;

  const { sub } = userContext;
  const uuid = uuidv4();
  const objectId = `${fileType.toLowerCase()}/${sub}/${uuid}/${fileName.toLowerCase()}`;

  const url = await getSignedPutObjectUrl(objectId, contentType);
  return { url, objectId };
}

// async function getSignedGetObjectUrl(objectId) {
//   return S3.getSignedUrlPromise('getObject', {
//     Bucket: 'gatamalvada',
//     Key: objectId,
//     Expires: 100,
//   });
// }
