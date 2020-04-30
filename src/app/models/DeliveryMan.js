import Sequelize, { Model } from 'sequelize';

class DeliveryMan extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
            },
            { sequelize, tableName: 'deliverymen' }
        );
        return this;
    }

    // método para associar avatar_id com o id de File
    static associate(models) {
        this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    }
}

export default DeliveryMan;
