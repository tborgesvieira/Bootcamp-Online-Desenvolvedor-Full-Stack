const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

exports.findPeriod = async (req, res) => {
    const periodParam = req.query.period;

    if (!periodParam) {
        res.status(400).send({ "error": "É necessário informar o parâmetro \"period\", cujo valor deve estar no formato yyyy-mm" });
    }

    try {
        const data = await TransactionModel.find({ yearMonth: periodParam });
        res.send(data);
    } catch (err) {
        res.status(500).send({ "error": err });
    }
}

exports.getPeriods = async (_, res) => {
    try {
        const data = await TransactionModel.find().distinct('yearMonth');
        res.send(data);
    }
    catch (err) {
        res.status(500).send({ "error": err });
    }
}

exports.insert = async (req, res) => {
    try {
        const {
            description,
            value,
            category,
            year,
            month,
            day,
            yearMonth,
            yearMonthDay,
            type } = req.body;

        var model = new TransactionModel({
            description,
            value,
            category,
            year,
            month,
            day,
            yearMonth,
            yearMonthDay,
            type
        });

        var data = await model.save();
        return res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Erro ao inserir");
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({ "error": "Não foi encontrado o item" });
    }

    try {
        const data = await TransactionModel.findOneAndRemove({ _id: id });

        if (!data)
            res.status(400).send({ "error": "Não foi encontrado o item" });

        res.send("ok");
    } catch (err) {
        res.status(500).send({ "error": err });
    }
}

exports.update = async (req, res) => {
    try{
    const id = req.body._id;

    const data = await TransactionModel.findOneAndUpdate(
        { '_id': id },
        req.body,
        { new: true }
    );

    if (!data)
        res.status(400).send("Documento não encontrado");

    res.send(data);

    }catch{
        res.status(500).send({ "error": err });
    }
}