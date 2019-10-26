import multer from 'multer'; // imagens
import crypto from 'crypto'; //
import { extname, resolve } from 'path'; // retorna o nome da imagem a exntesao e o resolve o path

/**
 * req é todo o corpo da requisição
 * file contem todas as informações do arquivo
 * cb função callback
 * retorna o random em forma de hex mais a extensão do arquivo
 * res.toString('hex') + extname(file.originalname)
 * ex: u11u3g71381j.png
 */
export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
