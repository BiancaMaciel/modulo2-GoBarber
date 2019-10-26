/**
 * Esse arquivo será utilizado tanto  na aplicacao
 * quanto no sequelize-cli
 * timestamps true serve para colocar na tabela a data de criacao
 * underscored padrao user_groups
 * */
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  port: 5433,
};
