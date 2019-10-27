require('dotenv/config');
/**
 * Esse arquivo será utilizado tanto  na aplicacao
 * quanto no sequelize-cli
 * timestamps true serve para colocar na tabela a data de criacao
 * underscored padrao user_groups
 * */
module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  port: 5433,
};
