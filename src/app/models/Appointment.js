import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

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
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date(), subHours(this.date, 2));
          },
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
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
