import express from "express";

import { accountModel } from '../models/account.js';

const router = express.Router();


/*
Item 5: Crie  um  endpoint  para  registrar  um  saque  
em  uma  conta.  Este  endpoint  deverá receber como 
parâmetros a “agência”, o número da “conta” e o valor 
do saque. Ele deverá atualizar o “balance” da conta, 
decrementando-o com o valor recebido com parâmetroe 
cobrando uma tarifa de saque de (1). O endpoint deverá 
validar se a conta informada existe, caso não exista 
deverá retornar um erro, caso exista retornar o  saldo 
atual da  conta.Também  deverá  validar  se  a  conta  
possui saldo  suficiente para aquele saque, se não tiver 
deverá retornar um erro, não permitindo assim que o saque 
fique negativo.

Utilização:
enviar um post para http:localhost:3000/saque
corpo da requisição:
{
    "agencia":10,
    "conta": 1001 ,
    "saque":10
}
*/

router.post("/", async (req, res) => {
    try {
        const { agencia, conta, saque } = req.body;

        const account = await accountModel.findOne({ agencia, conta });

        if (!account)
            res.status(400).send("Conta não encontrada!");        

        const newBalance = account.balance - (saque+1);

        if(newBalance < 0)
            res.status(400).send("Saldo insuficiente!");

        account.balance = newBalance;

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