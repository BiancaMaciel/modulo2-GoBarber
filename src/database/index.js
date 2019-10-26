/**
 * Esse arquivo carregará todos os Models da nossa aplicação
 */
import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';
import databaseConfig from '../config/database';
import { throws } from 'assert';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  /**
   * A função init fará a comunicação com a base de dados
   * e carrega nossos models
   */
  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gobarber',
      { useNewUrlParser: true, useFindAndModify: true }
    );
  }
}

export default new Database();
