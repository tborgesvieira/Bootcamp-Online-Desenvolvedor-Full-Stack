import express from "express";

import { accountModel } from '../models/account.js';

const router = express.Router();

/*
Item 11: Crie um endpoint para consultar os clientes mais 
ricos do banco. O endpoint deveráreceber como parâmetro um 
valor numérico para determinar a quantidade de clientes a  
serem  listados,e  o endpoint deverá  retornar  em ordem  
decrescente pelo  saldo, crescente pelo nome,a lista dos 
clientes (agência, conta,nome e saldo).

Utilização:
enviar um get para http:localhost:3000/maiorsaldo?limit=10
*/

router.get("/", async (req, res) => {
    try {
        const limit = +req.query.limit;

        const accounts = await accountModel.find()
                                     .sort({balance:-1, name:1})
                                     .limit(limit);
        
        res.send(accounts.map(m=>{
            return {
                agencia: m.agencia,
                conta: m.conta,
                name: m.name,
                saldo: m.balance
            }
        }));

    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;