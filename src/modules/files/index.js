import { GraphQLString, GraphQLInputObjectType } from 'graphql';

import { ForbiddenError } from 'apollo-server';
import FileType from './FileType';
import requestUpload from './FileResolver';

import { InputFileType, ContentType } from '../filters';

export const queries = {};

export const mutations = {
  requestUpload: {
    type: FileType,
    resolve: (_, input, context) => {
      if (context.user === null) {
        throw new ForbiddenError("You don't have permission to access.");
      }
      return requestUpload(context, input);
    },
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: 'RequestUploadInput',
          fields: {
            fileName: {
              type: GraphQLString,
            },
            fileType: {
              type: InputFileType,
            },
            contentType: {
              type: ContentType,
            },
          },
        }),
      },
    },
  },
};
