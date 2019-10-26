import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProvidersController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

//  essas rotas não passaram pelo middleware
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/**
 * routes.use(authMiddleware) --> middleware se torna global
 * e todas as rotas abaixo desse use passa a ter o middlware
 * routes.put('/users',authMiddleware, UserController.update); // Dessa forma n eh global somente essa rota terá acesso ao middlware
 */

routes.use(authMiddleware); // global

// Passara pelo middleware todas as rotas q estiverm abaixo do routes.use(auth)
routes.put('/users', UserController.update);

routes.get('/providers', ProvidersController.index);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/schedule', ScheduleController.index);

routes.get('/notification', NotificationController.index);
routes.put('/notification/:id', NotificationController.update);

export default routes;
