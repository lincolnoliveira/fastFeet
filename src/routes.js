// importando apenas a parte de roteamento do express
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryManController from './app/controllers/DeliveryManController';
import DeliveryAdminController from './app/controllers/DeliveryAdminController';
import FileController from './app/controllers/FileController';

const upload = multer(multerConfig);

const routes = new Router();

// rota post, para autenticar, criar uma sessão
routes.post('/sessions', SessionController.store);

// define um middleware global que verifica se está autenticado
// apesar de global, só vale para as rotas depois de sua declaração (tosco)
routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

// rota para subir arquivo avatar ou assinatura
routes.post('/files', upload.single('file'), FileController.store);

// rotas para gestão de entregadores
routes.post('/deliverymen', DeliveryManController.store);
routes.put('/deliverymen/:id', DeliveryManController.update);
routes.get('/deliverymen', DeliveryManController.index);
routes.delete('/deliverymen/:id', DeliveryManController.delete);

// rotas para gestão das encomendas pelo administrador
routes.post('/delivery-admin', DeliveryAdminController.store);
routes.put('/delivery-admin/:id', DeliveryAdminController.update);
routes.get('/delivery-admin', DeliveryAdminController.index);
routes.delete('/delivery-admin/:id', DeliveryAdminController.delete);

export default routes;
