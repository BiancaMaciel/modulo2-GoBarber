import User from '../models/User';
import File from '../models/File';

/**
 * include é o relacionamento
 * o as é só p deixar mais bonitinho o retorno
 * para não ficar lá 'file' fica avatar
 * o attributes debaixo do avatar está se referindo
 * aos dados do avtar serão mostrados somente o path e name
 */
class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(providers);
  }
}

export default new ProviderController();
