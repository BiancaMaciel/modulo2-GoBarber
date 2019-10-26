import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import User from '../models/User';
import Appointment from '../models/Appointment';

class ScheduleController {
  async index(req, res) {
    // 1 - Verificar se o usuario da req é um prestador de serviço
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return res.json(401).json({ error: 'User is not provider' });
    }

    // 2 - Verificar se a data esta vindo da req
    const { date } = req.query;
    const parsedDate = parseISO(date);

    // 3 - Verificar os agendamentos de um determinado prestador de serviço
    const appointments = await Appointment.findAll({
      where: {
        provider: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
        order: ['date'],
      },
    });
    return res.json(appointments);
  }
}

export default new ScheduleController();
