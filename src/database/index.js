import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

// vai importar todos os módulos da aplicação
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import DeliveryMan from '../app/models/DeliveryMan';
import Delivery from '../app/models/Delivery';

// vetor com os models importados
const models = [User, Recipient, File, DeliveryMan, Delivery];

class Database {
    constructor() {
        this.init();
    }

    init() {
        // cria conexão com o banco
        this.connection = new Sequelize(databaseConfig);
        // roda o init para cada model, passando a conexão (é o parâmetro sequelize no model)
        models
            .map((model) => model.init(this.connection))
            .map(
                (model) =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
