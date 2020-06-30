import express from "express";

import { accountModel } from '../models/account.js';

const router = express.Router();

/*
Item 11: Crie  um  endpoint  que  irá  transferir  
o  cliente  com  maior  saldo  em  contade  cada 
agência para a agência private agencia=99. O endpoint 
deverá retornar a lista dos clientes da agencia private.

Utilização:
enviar um get para http:localhost:3000/clientesespeciais
*/

router.get("/", async (req, res) => {
    try {
        const agencias = await accountModel.distinct("agencia");

        const promises = agencias.map(async (agencia) =>{
            const account = await accountModel.find({agencia})
            .sort({balance:-1})
            .limit(1);
           
            account[0].oldAgencia = account.agencia;
            account[0].agencia = 99;

            await account[0].save();
        });

        await Promise.all(promises);

        const privates = await accountModel.find({"agencia":99})

        res.send(privates);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;