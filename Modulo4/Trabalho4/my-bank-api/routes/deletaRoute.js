import express from "express";

import { accountModel } from '../models/account.js';

const router = express.Router();

/*
Item 7: 
Crie  um  endpoint  para  excluir  uma  conta.  
Este  endpoint  deverá  receber  como parâmetro a 
“agência” e o número da “conta” da contae retornar 
o número de contasativaspara esta agência.

Utilização:
enviar um delete para http:localhost:3000/deleta?agencia=10&conta=1001
*/

router.delete("/", async (req, res) => {
    try {
        const { agencia, conta } = req.query;

        const account = await accountModel.findOneAndRemove({ agencia, conta });

        if (!account)
            res.status(400).send("Conta não encontrada!");

        const totalAccounts = await accountModel.count({agencia});

        res.send({
            "contasAtivas": totalAccounts
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});


export default router;