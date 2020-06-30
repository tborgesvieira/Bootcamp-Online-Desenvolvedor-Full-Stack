import express from 'express';
import mongoose from 'mongoose';

import {studentRouter} from './routes/studentRouter.js';

mongoose.connect("mongodb+srv://<user>:<pass>@cluster0-dxvwu.mongodb.net/grades?retryWrites=true&w=majority",
{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(
    console.log("Conectado ao Mongo DB Atlas")
).catch((err)=>{
    console.log(err);
});

const app = express();

app.use(express.json());
app.use(studentRouter);

app.listen(3000, () => console.log("API iniciada"));