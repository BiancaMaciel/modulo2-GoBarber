import Sequelize, { Model } from 'sequelize';

/**
 *   super.init({
      date: Sequelize.DATE,
      user_id: Sequelize.INTEGER,
      provider_id: Sequelize.INTEGER,
      canceled_at: Sequelize.DATE,
    });
    não precisamos inserir os campos que fazem parte do relacionamento
    pois quando fazemos o relacionamento ele vem automatico
 */
class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
