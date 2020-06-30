import express from "express";

import { accountModel } from '../models/account.js';

const router = express.Router();

/*
Item 10: Crie um endpoint para consultar os clientes 
com o menor saldo em conta. O endpoint devera receber 
como parâmetro um valor numérico para determinar a 
quantidade de clientes  a  serem  listados, e o endpoint  
deverá  retornar  em  ordem  crescente  pelo saldo a 
lista dos clientes (agência, conta, saldo).

Utilização:
enviar um get para http:localhost:3000/menorsaldo?limit=10
*/

router.get("/", async (req, res) => {
    try {
        const limit = +req.query.limit;

        const accounts = await accountModel.find()
                                     .sort({balance:1})
                                     .limit(limit);                                     
        
        res.send(accounts.map(m=>{
            return {
                agencia: m.agencia,
                conta: m.conta,
                saldo: m.balance
            }
        }));

    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;