import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';

class DeliveryAdminController {
    async store(req, res) {
        const schema = Yup.object().shape({
            deliveryman_id: Yup.number().required(),
            recipient_id: Yup.number().required(),
            product: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Campos inválidos.' });
        }
        const { deliveryman_id, recipient_id, product } = req.body;
        // verifica se o entregador e destinatário existem
        const entregador = await DeliveryMan.findByPk(deliveryman_id);
        if (!entregador) {
            return res
                .status(400)
                .json({ error: `Entregador ${deliveryman_id} não existe.` });
        }
        const destinatario = await Recipient.findByPk(recipient_id);
        if (!destinatario) {
            return res
                .status(400)
                .json({ error: `Destinatário ${recipient_id} não existe.` });
        }
        // retornar apenas alguns campos
        const entrega = await Delivery.create({
            deliveryman_id,
            recipient_id,
            product,
        });

        return res.json(entrega);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            deliveryman_id: Yup.number().required(),
            recipient_id: Yup.number().required(),
            product: Yup.string().required(),
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

        const entrega = await Delivery.findByPk(req.params.id);

        if (!entrega) {
            return res
                .json(404)
                .json({ error: `Entrega ${req.params.id} não existe.` });
        }

        const { deliveryman_id, recipient_id, product } = req.body;
        entrega.deliveryman_id = deliveryman_id;
        entrega.recipient_id = recipient_id;
        entrega.product = product;
        return res.json(await entrega.save());
    }

    async delete(req, res) {
        const paramSchema = Yup.object().shape({
            id: Yup.number().required(),
        });

        if (!(await paramSchema.isValid(req.params))) {
            return res.status(400).json({ error: 'Parâmetro na URL inválido' });
        }

        const entrega = await Delivery.findByPk(req.params.id);

        if (!entrega) {
            return res
                .status(404)
                .json({ error: `Entrega ${req.params.id} não encontrada.` });
        }

        const resposta = entrega.destroy();
        return res.json(resposta);
    }

    async index(req, res) {
        const entregas = await Delivery.findAll({
            attributes: [
                'id',
                'product',
                'recipient_id',
                'deliveryman_id',
                'start_date',
                'end_date',
                'cancelled_at',
            ],
            include: [
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: ['name'],
                },
                {
                    model: DeliveryMan,
                    as: 'deliveryMan',
                    attributes: ['name', 'email'],
                },
                {
                    model: DeliveryMan,
                    as: 'deliveryMan',
                    attributes: ['name', 'email'],
                },
            ],
        });
        return res.json(entregas);
    }
}

export default new DeliveryAdminController();
