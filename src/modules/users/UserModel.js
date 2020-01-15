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
          values: ['MEN', 'WOMAN', 'TRANSSEXUAL'],
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        description: Sequelize.STRING,
        avatar_url: Sequelize.STRING,
        geolocation: Sequelize.STRING,
        premium: Sequelize.BOOLEAN,
        phone: Sequelize.STRING,
        verified: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.City, { foreignKey: 'city_id', as: 'city' });
    this.hasMany(models.Vip, { foreignKey: 'user_id', as: 'vips' });
    this.hasMany(models.Photo, { foreignKey: 'user_id', as: 'photos' });
    this.hasMany(models.Video, { foreignKey: 'user_id', as: 'videos' });
  }
}

export default User;
