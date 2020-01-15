require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'gatamalvada',
  define: {
    timestamps: true,
    underscored: true,
    underscoreAll: true,
  },
};
