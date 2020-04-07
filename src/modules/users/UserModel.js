import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUIDV4,
          primaryKey: true,
        },
        sex: {
          type: Sequelize.ENUM,
          values: ['MEN', 'WOMAN'],
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        description: Sequelize.STRING,
        avatar_url: Sequelize.STRING,
        geopoint: Sequelize.JSONB,
        phone: Sequelize.STRING,
        verified: Sequelize.BOOLEAN,
        photos: Sequelize.JSONB,
        videos: Sequelize.JSONB,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.City, { foreignKey: 'city_id', as: 'city' });
    this.hasOne(models.Vip, { foreignKey: 'user_id', as: 'vips' });
  }
}

export default User;
