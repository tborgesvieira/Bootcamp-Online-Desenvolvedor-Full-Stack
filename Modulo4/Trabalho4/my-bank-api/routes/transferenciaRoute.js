import express from "express";

import { accountModel } from '../models/account.js';

const router = express.Router();

/*
Item 8: Crie  um  endpoint  para  realizar  transferências  
entre  contas.Este  endpoint  deverá receber como parâmetro 
o número da “conta” origem, o número da “conta” destino e o  
valor  de  transferência.  Este  endpoint  deve  validar  
se  as  contas  são  da  mesma agência para realizar a 
transferência, caso seja de agências distintas o valor de 
tarifa de transferencia (8) deve ser debitado na “conta” 
origem.O endpoint deverá retornar o saldo da conta origem.

Utilização:
enviar um post para http:localhost:3000/transferencia
corpo da requisição:
{
    "contaOrigem": 1002,
    "contaDestino": 1001,
    "valor":10
}
ou para decrementar +8
{
    "contaOrigem": 1002,
    "contaDestino": 3001,
    "valor":10
}
*/

router.post("/", async (req, res) => {
    try {
        const { contaOrigem, contaDestino, valor } = req.body;

        const accountOrigem = await accountModel.findOne({ "conta": contaOrigem });

        if (!accountOrigem) {
            res.status(400).send("Conta de Origem não encontrada!");
        }

        const accountDestino = await accountModel.findOne({ "conta": contaDestino });

        if (!accountDestino) {
            res.status(400).send("Conta de Origem não encontrada!");
        }

        let valorDebito = valor;

        if (accountOrigem.agencia !== accountDestino.agencia){
            valorDebito += 8;
        }

        if((accountOrigem.balance - valorDebito) < 0){
            res.status(400).send("Saldo da Conta de Origem insuficiente!");
        }

        accountOrigem.balance -= valorDebito;
        accountDestino.balance += valor;

        await accountOrigem.save();
        await accountDestino.save();
        
        res.send({
            "name": accountOrigem.name,
            "balance": accountOrigem.balance
        });
        
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;