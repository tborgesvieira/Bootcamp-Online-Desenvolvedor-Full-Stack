import express from 'express';

import { studentModel } from '../models/student.js';

const app = express();


app.get('/student', async (_, res) => {
    try {
        const student = await studentModel.find({});
        res.send(student);
    } catch (erro) {
        res.status(500).send(error);
    }
});

app.post('/student', async (req, res) => {
    try {
        const student = new studentModel(req.body);
        await student.save();
        res.send(student);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.patch('/student/:id', async (req, res) => {
    try {
        const student = await studentModel.findOneAndUpdate(
            { '_id': req.params.id }, 
            req.body, 
            { new: true }
        );

        if (!student)
            res.status(400).send("Documento não encontrado");

        res.send(student);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/student/:id', async (req, res) => {
    try {
        const student = await studentModel.findByIdAndDelete({ '_id': req.params.id });

        if (!student)
            res.status(400).send("Documento não encontrado");

        res.status(200).send("Deletado");
    } catch (error) {
        res.status(500).send(error);
    }
});

export { app as studentRouter };