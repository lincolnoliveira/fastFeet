// importando apenas a parte de roteamento do express
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryMenController from './app/controllers/DeliveryMenController';

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
routes.post('/files', upload.single('file'), (req, res) => {
    return res.json({ upload: true });
});

// rotas para gestão de entregadores
routes.post('/deliverymen', DeliveryMenController.store);
routes.put('/deliverymen/:id', DeliveryMenController.update);
routes.get('/deliverymen', DeliveryMenController.index);
routes.delete('/deliverymen/:id', DeliveryMenController.delete);

// module.exports = routes;
export default routes;
