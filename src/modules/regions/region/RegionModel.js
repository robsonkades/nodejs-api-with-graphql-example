import Sequelize, { Model } from 'sequelize';

class Region extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUIDV4,
          primaryKey: true,
        },
        name: Sequelize.STRING,
        uf: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.City, { foreignKey: 'id', as: 'cities' });
  }
}

export default Region;
