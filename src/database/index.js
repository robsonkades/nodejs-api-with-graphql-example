import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Region from '../modules/regions/region/RegionModel';
import City from '../modules/regions/city/CityModel';
import User from '../modules/users/UserModel';
import Video from '../modules/videos/VideoModel';
import Photo from '../modules/photos/PhotoModel';
import Vip from '../modules/vips/VipModel';

const { Op } = Sequelize;

const models = [Region, City, User, Video, Photo, Vip];

const operatorsAliases = {
  and: Op.and, // [{a: 5}, {b: 6}] // (a = 5) AND (b = 6)
  or: Op.or, // [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)
  gt: Op.gt, // 6,                // > 6
  gte: Op.gte, // 6,               // >= 6
  lr: Op.lt, // 10,               // < 10
  lte: Op.lte, // 10,              // <= 10
  ne: Op.ne, // 20,               // != 20
  eq: Op.eq, // 3,                // = 3
  is: Op.is, // null              // IS NULL
  not: Op.not, // true,            // IS NOT TRUE
  between: Op.between, // [6, 10],     // BETWEEN 6 AND 10
  notBetween: Op.notBetween, // [11, 15], // NOT BETWEEN 11 AND 15
  in: Op.in, // [1, 2],           // IN [1, 2]
  notIn: Op.notIn, // [1, 2],        // NOT IN [1, 2]
  like: Op.like, // '%hat',         // LIKE '%hat'
  notLike: Op.notLike, // '%hat'       // NOT LIKE '%hat'
  iLike: Op.iLike, // '%hat'         // ILIKE '%hat' (case insensitive) (PG only)
  notILike: Op.notILike, // '%hat'      // NOT ILIKE '%hat'  (PG only)
  startsWith: Op.startsWith, // 'hat'     // LIKE 'hat%'
  notStartsWith: Op.not[Op.startsWith], // 'hat'     // NOT LIKE 'hat%'
  endsWith: Op.endsWith, // 'hat'       // LIKE '%hat'
  substring: Op.substring, // 'hat'      // LIKE '%hat%'
  contains: Op.contains, // @> [1, 2] (PG array contains operator)
};

const config = {
  ...databaseConfig,
  operatorsAliases,
  logging: true,
};

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(config);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
