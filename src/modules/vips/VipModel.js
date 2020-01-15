import Sequelize, { Model } from 'sequelize';

class Vip extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUIDV4,
          primaryKey: true,
        },
        order: {
          type: Sequelize.UUIDV4,
        },
        price: Sequelize.DOUBLE,
        user_id: {
          type: Sequelize.UUIDV4,
        },
        date: Sequelize.DATE,
        expire: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Vip;
