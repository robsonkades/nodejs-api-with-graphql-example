import { UserInputError } from 'apollo-server';
import Sequelize from 'sequelize';
import * as Yup from 'yup';
import Base64 from 'Base64';

import { getAsync, setAsync } from '../../config/redis';

import UserModel from './UserModel';
import Photo from '../photos/PhotoModel';
import City from '../regions/city/CityModel';
import Vip from '../vips/VipModel';
import Region from '../regions/region/RegionModel';
import Video from '../videos/VideoModel';

const { Op } = Sequelize;

const paginate = ({ offset, limit }) => {
  if (!offset) {
    offset = 0;
  }

  if (offset < 0) {
    offset = 0;
  }

  if (!limit) {
    limit = 10;
  }

  if (limit > 10 || limit < 1) {
    limit = 10;
  }

  return {
    offset,
    limit,
  };
};

export async function saveUser(context, { input }) {
  const userContext = context.user;

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    region: Yup.string().required(),
    city: Yup.string().required(),
  });

  await schema.validate(input).catch(err => {
    throw new UserInputError(err.name, { ...err.errors });
  });

  const exists = await UserModel.findOne({
    where: {
      id: {
        [Op.eq]: userContext.sub,
      },
    },
  });

  if (exists) {
    throw new UserInputError('User profile already exists');
  }

  const { Username, UserAttributes, sub } = userContext;

  const email = UserAttributes.find(attribute => attribute.Name === 'email');
  const phone = UserAttributes.find(
    attribute => attribute.Name === 'phone_number'
  );

  input.id = sub;
  input.username = Username;
  input.email = email.Value;
  input.phone = phone.Value;

  return UserModel.create(input);
}

export async function getUsers(
  _,
  { filters = {}, pagination = {}, order = {} }
) {
  const orders = Object.entries(order || []);

  const { userFilter, cityFilter, regionFilter } = filters;

  const users = await UserModel.findAndCountAll({
    ...paginate(pagination),
    where: userFilter,
    include: [
      {
        model: City,
        as: 'city',
        attributes: ['id', 'name', 'region_id'],
        where: cityFilter,
        include: [
          {
            model: Region,
            as: 'region',
            attributes: ['id', 'name', 'uf'],
            where: regionFilter,
          },
        ],
      },
      { model: Photo, as: 'photos', attributes: ['id', 'url', 'description'] },
      { model: Video, as: 'videos', attributes: ['id', 'url', 'description'] },
    ],
    order: [...orders],
  });
  return users.rows;
}

export async function getUsersVip(_, { filters = {} }) {
  const { cityFilter, regionFilter } = filters;

  const users = await UserModel.findAll({
    include: [
      {
        model: City,
        as: 'city',
        attributes: ['id', 'name', 'region_id'],
        where: cityFilter,
        include: [
          {
            model: Region,
            as: 'region',
            attributes: ['id', 'name', 'uf'],
            where: regionFilter,
          },
        ],
      },
      {
        model: Vip,
        as: 'vips',
        where: {
          expire: {
            [Op.gte]: new Date(),
          },
        },
        order: ['date'],
      },
    ],
  });
  return users;
}

export async function getUsersVipAsyncCache(input, context) {
  const value = JSON.stringify(input);
  const keyRedis = Base64.btoa(value);

  const response = await getAsync(keyRedis);
  if (response == null) {
    const users = await getUsersVip(input, context);
    const data = JSON.stringify(users);
    await setAsync(keyRedis, data, 'EX', 30 * 5);
    return Promise.resolve(users);
  }
  const data = JSON.parse(response);
  return Promise.resolve(data);
}

export async function getUsersAsyncCache(input, context) {
  const value = JSON.stringify(input);
  const keyRedis = Base64.btoa(value);

  const response = await getAsync(keyRedis);
  if (response == null) {
    const users = await getUsers(input, context);
    const data = JSON.stringify(users);
    await setAsync(keyRedis, data, 'EX', 30 * 5);
    return Promise.resolve(users);
  }
  const data = JSON.parse(response);
  return Promise.resolve(data);
}
