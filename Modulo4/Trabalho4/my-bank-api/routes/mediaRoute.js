import express from "express";

import { accountModel } from '../models/account.js';

const router = express.Router();

/*
Item 9: Crie  um  endpoint  para  consultar  a  média  do  
saldo  dos  clientes  de  determinada agência. 
O endpoint deveráreceber como parametro a “agência” 
e deverá retornar o balancemédio da conta.

Utilização:
enviar um get para http:localhost:3000/media?agencia=10
*/

router.get("/", async (req, res) => {
    try {
        const agenciaBusca  = +req.query.agencia;

        const mediaAgencia = await accountModel.aggregate([
            {$match: {agencia : agenciaBusca}},
            {$group: {_id: null, media: {$avg: "$balance"}}}
        ]);

        res.send(mediaAgencia);

    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;