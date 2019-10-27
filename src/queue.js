import 'dotenv/config';
import Queue from './lib/Queue';

/**
 * não vai executar app no mesmo node
 * onde está executando a fila,
 * asssim a fila nunca
 * vai influenciar na performace da aplicação
 */
Queue.processQueue();
