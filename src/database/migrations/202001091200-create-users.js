module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      sex: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['MEN', 'WOMAN', 'TRANSSEXUAL'],
      },
      city_id: {
        allowNull: false,
        type: Sequelize.UUID,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: { model: 'cities', key: 'id' },
      },
      geolocation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      premium: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatar_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      verified: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
