import jwt from 'jsonwebtoken';
import { promisify } from 'util'; //pega uma função que tem como default callback e faz se tornar async e await
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  /**
   * desestruturação existem algumas formas
   * [
   *  'Bearer',
   *  'token'
   * ]
   * quando usamos [, token] estamos dizendo que não queremos o bearer
   * const decoded = await promisify(jwt.verify)(token, authConfig.secret);
   * promisify(jwt.verify) -> jwt.verify é uma função com callback;
   * promisify retornará a função como async
   * só depois com o retorno do promisify será executado (token, authConfig.secret)
   *
   */

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
