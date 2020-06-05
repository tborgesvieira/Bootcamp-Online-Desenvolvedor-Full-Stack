import express from "express";
import { ready, write } from "../file/manipulate.js";

const router = express.Router();

// 1
router.post("/", async (req, res) => {
    try {
        let grade = req.body;

        const json = JSON.parse(await ready());

        grade = { id: json.nextId++, ...grade };

        grade.timestamp = `${new Date().toISOString()}`;

        json.grades.push(grade);

        write(json);

        res.send(grade);

    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 2
router.put("/", async (req, res) => {
    try {
        let grade = req.body;

        const json = JSON.parse(await ready());

        let index = json.grades.findIndex(ac => ac.id === grade.id);

        if (index === undefined)
            res.status(404).send("Registro não encontrado");

        //Não especificou se era para manter o timestamp antigo
        //ou setar um novo
        //então foi colocado um novo
        grade.timestamp = `${new Date().toISOString()}`;

        json.grades[index] = grade;

        res.send(grade);

    } catch (err) {
        res.status(500).send(err.message);
    }
});

//3
router.delete("/:id", async (req, res) => {
    try{
        const json = JSON.parse(await ready());

        const grade = json.grades.find(c => c.id === parseInt(req.params.id));

        if (grade === undefined)
            res.status(404).send("Registro não encontrado");
        
        json.grades = json.grades.filter(gr => gr.id != grade.id);

        await write(json);

        res.send(`Registro ${grade.id} excluído`);

    }catch (err) {
        res.status(500).send(err.message);
    }
});

// 4
router.get("/:id", async (req, res) => {
    try {
        const json = JSON.parse(await ready());

        const grade = json.grades.find(c => c.id === parseInt(req.params.id));

        if (grade === undefined)
            res.status(404).send("Registro não encontrado");

        res.send(JSON.stringify(grade));

    } catch (err) {
        res.status(500).send(err.message);
    }
});

//Implementação extra, para ver se estava buscando todos
router.get("/", async (_, res) => {
    try {
        const data = await ready();
        res.send(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;