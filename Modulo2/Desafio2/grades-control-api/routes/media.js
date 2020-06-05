import express from "express";
import { ready, write } from "../file/manipulate.js";

const router = express.Router();

// 6
router.post("/", async (req, res) => {
    try {
        const grade = req.body;

        const json = JSON.parse(await ready());

        var grades = json.grades.filter(gr =>
            gr.subject.toLowerCase() === grade.subject.toLowerCase()
            && gr.type.toLowerCase() === grade.type.toLowerCase()
        );
        
        const soma  = grades.reduce((acc, cur)=>acc + cur.value, 0);
        console.log(soma);
        const media = soma / grades.length;
        
        res.send(`Média encontrada: ${media}`);

    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;