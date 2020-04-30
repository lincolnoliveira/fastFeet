import * as Yup from 'yup';

import DeliveryMan from '../models/DeliveryMan';

class DeliveryManController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Campos inválidos.' });
        }
        // verifica se o email já está cadastrado
        const exists = await DeliveryMan.findOne({
            where: { email: req.body.email },
        });
        if (exists) {
            return res
                .status(400)
                .json({ error: 'Entregador com este e-mail já existe.' });
        }
        // mas quer retornar apenas alguns campos
        const { id, name, email } = await DeliveryMan.create(req.body);

        return res.json({
            id,
            name,
            email,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Campos inválidos.' });
        }

        const paramSchema = Yup.object().shape({
            id: Yup.number().required(),
        });

        if (!(await paramSchema.isValid(req.params))) {
            return res.status(400).json({ error: 'Parâmetro na URL inválido' });
        }

        const entregador = await DeliveryMan.findByPk(req.params.id);

        if (!entregador) {
            return res.json(404).json({ error: 'Entregador não existe.' });
        }

        const { name, email } = req.body;

        entregador.name = name;
        entregador.email = email;
        return res.json(await entregador.save(entregador));
    }

    async delete(req, res) {
        const paramSchema = Yup.object().shape({
            id: Yup.number().required(),
        });

        if (!(await paramSchema.isValid(req.params))) {
            return res.status(400).json({ error: 'Parâmetro na URL inválido' });
        }

        const entregador = await DeliveryMan.findByPk(req.params.id);

        if (!entregador) {
            return res.status(404).json({ error: 'Entregador não existe.' });
        }

        const resposta = entregador.destroy();
        return res.json(resposta);
    }

    async index(req, res) {
        const entregadores = await DeliveryMan.findAll({
            attributes: ['id', 'name', 'email'],
        });
        return res.json(entregadores);
    }
}

export default new DeliveryManController();
