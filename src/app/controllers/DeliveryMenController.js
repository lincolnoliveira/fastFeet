class DeliveryMenController {
    async store(req, res) {
        return res.json({ metodo: 'store' });
    }

    async update(req, res) {
        return res.json({ metodo: 'Update' });
    }

    async delete(req, res) {
        return res.json({ metodo: 'delete' });
    }

    async index(req, res) {
        return res.json({ metodo: 'index' });
    }
}

export default new DeliveryMenController();
