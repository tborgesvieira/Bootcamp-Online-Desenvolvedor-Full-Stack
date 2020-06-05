import express from "express";
import { ready } from "../file/manipulate.js";

const router = express.Router();

// 5
router.post("/", async (req, res) => {
    try {
        const grade = req.body;

        console.log(grade);

        const json = JSON.parse(await ready());            

        var grades = json.grades.filter(gr =>
            gr.student.toLowerCase() === grade.student.toLowerCase()
            && gr.subject.toLowerCase() === grade.subject.toLowerCase()
        );
        
        const soma  = grades.reduce((acc, cur)=>acc + cur.value, 0);        
        
        res.send(`Nota encontrada: ${soma}`);

    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;