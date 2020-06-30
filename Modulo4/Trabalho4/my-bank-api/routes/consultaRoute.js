import express from "express";

import { accountModel } from '../models/account.js';

const router = express.Router();

/*
Item 6: Crie  um  endpoint  para  consultar  o  saldo  da  conta.  
Este  endpoint  deverá  receber como parâmetro a “agência” e o
número da “conta”,e deverá retornar seu “balance”. Caso a conta 
informada não exista, retornar um erro 

Utilização:
enviar um get para http:localhost:3000/consulta?agencia=10&conta=1001
*/

router.get("/", async (req, res) => {
    try {
        const { agencia, conta } = req.query;

        const account = await accountModel.findOne({ agencia, conta });

        if (!account)
            res.status(400).send("Conta não encontrada!");

        res.send({
            "name": account.name,
            "balance": account.balance
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;