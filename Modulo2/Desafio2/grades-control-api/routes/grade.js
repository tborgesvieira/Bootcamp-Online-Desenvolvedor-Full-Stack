import express from "express";
import { ready, write } from "../file/manipulate.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        let grade = req.body;
        
        const json = JSON.parse(await ready());

        grade = {id: json.nextId++, timestamp: Date.now(), ...grade};

        json.grades.push(grade);

        write(json);

        res.send(grade);

    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/", async (_, res) => {
    try {
        const data = await ready();
        res.send(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const json = JSON.parse(await ready());

        const grade = json.grades.find(c => c.id === parseInt(req.params.id));

        if (grade !== undefined)
            res.send(JSON.stringify(grade));
        else
            res.status(404).send("Não encontrado");

    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;