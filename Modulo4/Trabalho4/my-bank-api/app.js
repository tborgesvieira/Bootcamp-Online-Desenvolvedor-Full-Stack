import express from 'express';
import mongoose from 'mongoose';

import depositoRoute from './routes/depositoRoute.js';
import saqueRoute from './routes/saqueRoute.js';
import consultaRoute from './routes/consultaRoute.js';
import deletaRoute from './routes/deletaRoute.js';
import transferenciaRoute from './routes/transferenciaRoute.js';
import mediaRoute from './routes/mediaRoute.js';
import menorsaldoRoute from './routes/menorsaldoRoute.js';
import maiorsaldoRoute from './routes/maiorsaldoRoute.js';
import clientesespeciaisRoute from './routes/clientesespeciaisRoute.js';

const connect = async() =>{
    try {
        await mongoose.connect("mongodb+srv://<user>:<pass>@cluster0-dxvwu.mongodb.net/bank?retryWrites=true&w=majority",
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });

        console.log("Connectado ao Mongo");
    } catch (err) {
        console.log(err);
    }
}

connect();

const app = express();

app.use(express.json());

//Rotas
app.use("/deposito", depositoRoute); //Item 4
app.use("/saque", saqueRoute); //Item 5
app.use("/consulta", consultaRoute); //Item 6
app.use("/deleta", deletaRoute); //Item 7
app.use("/transferencia", transferenciaRoute); //Item 8
app.use("/media", mediaRoute); //Item 9
app.use("/menorsaldo", menorsaldoRoute); //Item 10
app.use("/maiorsaldo", maiorsaldoRoute); //Item 11
app.use("/clientesespeciais", clientesespeciaisRoute); //Item 12

app.listen(3000, () => console.log("API iniciada"));