// importando apenas a parte de roteamento do express
import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

// import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// rota post, para autenticar, criar uma sessão
routes.post('/sessions', SessionController.store);

// define um middleware global que verifica se está autenticado
// apesar de global, só vale para as rotas depois de sua declaração (tosco)
routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

// module.exports = routes;
export default routes;
