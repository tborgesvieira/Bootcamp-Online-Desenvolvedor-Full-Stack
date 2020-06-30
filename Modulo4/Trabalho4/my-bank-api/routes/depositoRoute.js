import express from "express";

import { accountModel } from '../models/account.js';

const router = express.Router();

/*
Item 4: Crie um endpoint para registrar um depósito em uma conta. 
Este endpoint deverá receber como parâmetros a “agencia”, 
o número da “conta”e o valor do depósito. Ele deverá atualizar 
o “balance” da  conta,  incrementando-o  com  o  valor  recebido 
como parâmetro. O endpoint deverá validar se a conta informada existe, 
caso não exista deverá retornar um erro, caso exista retornar o 
saldo atual da conta.

Utilização:
enviar um post para http:localhost:3000/deposito
corpo da requisição:
{
    "agencia":10,
    "conta": 1001 ,
    "deposito":587
}
*/

router.post("/", async (req, res) => {
    try {
        const { agencia, conta, deposito } = req.body;

        const account = await accountModel.findOne({ agencia, conta });

        if (!account)
            res.status(400).send("Conta não encontrada!");

        account.balance += deposito;

        await account.save();

        res.send({
            "name": account.name,
            "balance": account.balance
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;