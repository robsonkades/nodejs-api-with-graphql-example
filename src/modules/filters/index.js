import {
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLID,
  GraphQLEnumType,
} from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

const InputFilterBoolean = new GraphQLInputObjectType({
  name: 'TableBooleanFilterInput',
  fields: {
    ne: {
      type: GraphQLBoolean,
    },
    eq: {
      type: GraphQLBoolean,
    },
  },
});

const InputFilterFloat = new GraphQLInputObjectType({
  name: 'TableFloatFilterInput',
  fields: {
    ne: {
      type: GraphQLFloat,
    },
    between: {
      type: GraphQLList(GraphQLFloat),
    },
  },
});

const InputFilterOrder = new GraphQLEnumType({
  name: 'TableOrderFilterInput',
  values: {
    asc: {
      value: 'ASC',
    },
    desc: {
      value: 'DESC',
    },
  },
});

const InputFileType = new GraphQLEnumType({
  name: 'TableFileTypeInput',
  values: {
    IMAGE: {
      value: 'IMAGES',
    },
    VIDEO: {
      value: 'VIDEOS',
    },
  },
});

const ContentType = new GraphQLEnumType({
  name: 'ContentTypeInput',
  values: {
    JPEG: {
      value: 'image/jpeg',
    },
    PNG: {
      value: 'image/png',
    },
    MPEG: {
      value: 'video/mpeg',
    },
  },
});

const InputSex = new GraphQLEnumType({
  name: 'InputSex',
  values: {
    WOMAN: {
      value: 'WOMAN',
    },
    MEN: {
      value: 'MEN',
    },
  },
});

const InputFilterID = new GraphQLInputObjectType({
  name: 'TableIDFilterInput',
  fields: {
    ne: {
      type: GraphQLID,
    },
    eq: {
      type: GraphQLID,
    },
    le: {
      type: GraphQLID,
    },
    lt: {
      type: GraphQLID,
    },
    ge: {
      type: GraphQLID,
    },
    gt: {
      type: GraphQLID,
    },
    contains: {
      type: GraphQLID,
    },
    notContains: {
      type: GraphQLID,
    },
    between: {
      type: GraphQLList(GraphQLID),
    },
    beginsWith: {
      type: GraphQLID,
    },
  },
});

const InputFilterString = new GraphQLInputObjectType({
  name: 'TableStringFilterInput',
  fields: {
    gt: {
      type: GraphQLString,
    },
    gte: {
      type: GraphQLString,
    },
    lr: {
      type: GraphQLString,
    },
    ne: {
      type: GraphQLString,
    },
    eq: {
      type: GraphQLString,
    },
    is: {
      type: GraphQLString,
    },
    not: {
      type: GraphQLString,
    },
    between: {
      type: GraphQLList(GraphQLString),
    },
    notBetween: {
      type: GraphQLList(GraphQLString),
    },
    in: {
      type: GraphQLList(GraphQLString),
    },
    notIn: {
      type: GraphQLList(GraphQLString),
    },
    like: {
      type: GraphQLString,
    },
    notLike: {
      type: GraphQLString,
    },
    iLike: {
      type: GraphQLString,
    },
    notILike: {
      type: GraphQLString,
    },
    startsWith: {
      type: GraphQLString,
    },
    notStartsWith: {
      type: GraphQLString,
    },
    endsWith: {
      type: GraphQLString,
    },
    substring: {
      type: GraphQLString,
    },
    contains: {
      type: GraphQLList(GraphQLString),
    },
  },
});

const InputFilterDateTime = new GraphQLInputObjectType({
  name: 'TableDateTimeFilterInput',
  fields: {
    gt: {
      type: GraphQLDateTime,
    },
    gte: {
      type: GraphQLDateTime,
    },
    lr: {
      type: GraphQLDateTime,
    },
    ne: {
      type: GraphQLDateTime,
    },
    eq: {
      type: GraphQLDateTime,
    },
    is: {
      type: GraphQLDateTime,
    },
    not: {
      type: GraphQLDateTime,
    },
    between: {
      type: GraphQLList(GraphQLDateTime),
    },
    notBetween: {
      type: GraphQLList(GraphQLDateTime),
    },
    in: {
      type: GraphQLList(GraphQLDateTime),
    },
    notIn: {
      type: GraphQLList(GraphQLDateTime),
    },
    like: {
      type: GraphQLDateTime,
    },
    notLike: {
      type: GraphQLDateTime,
    },
    iLike: {
      type: GraphQLDateTime,
    },
    notILike: {
      type: GraphQLDateTime,
    },
    startsWith: {
      type: GraphQLDateTime,
    },
    notStartsWith: {
      type: GraphQLDateTime,
    },
    endsWith: {
      type: GraphQLDateTime,
    },
    substring: {
      type: GraphQLDateTime,
    },
    contains: {
      type: GraphQLList(GraphQLDateTime),
    },
  },
});

const InputPagination = new GraphQLInputObjectType({
  name: 'PaginationFilterInput',
  fields: {
    offset: {
      type: GraphQLInt,
      defaultValue: 1,
    },
    limit: {
      type: GraphQLInt,
      defaultValue: 10,
    },
  },
});

const InputFilterInt = new GraphQLInputObjectType({
  name: 'TableIntFilterInput',
  fields: {
    ne: {
      type: GraphQLInt,
    },
    eq: {
      type: GraphQLInt,
    },
    le: {
      type: GraphQLInt,
    },
    lt: {
      type: GraphQLInt,
    },
    ge: {
      type: GraphQLInt,
    },
    gt: {
      type: GraphQLInt,
    },
    contains: {
      type: GraphQLInt,
    },
    notContains: {
      type: GraphQLInt,
    },
    between: {
      type: GraphQLList(GraphQLInt),
    },
  },
});

const RegionTypeInput = new GraphQLInputObjectType({
  name: 'RegionTypeInput',
  fields: {
    name: {
      type: InputFilterString,
    },
    uf: {
      type: InputFilterString,
    },
  },
});

const CityTypeInput = new GraphQLInputObjectType({
  name: 'CityTypeInput',
  fields: {
    name: {
      type: InputFilterString,
    },
  },
});

const GeoPointTypeInput = new GraphQLInputObjectType({
  name: 'GeoPointTypeInput',
  fields: {
    lat: {
      type: GraphQLString,
    },
    log: {
      type: GraphQLString,
    },
  },
});

export {
  InputFilterString,
  InputFilterInt,
  InputFilterFloat,
  InputFilterBoolean,
  InputFilterID,
  InputPagination,
  InputFilterOrder,
  InputFilterDateTime,
  InputSex,
  CityTypeInput,
  RegionTypeInput,
  InputFileType,
  ContentType,
  GeoPointTypeInput,
};
