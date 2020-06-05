import express from "express";
import { ready } from "../file/manipulate.js";

const router = express.Router();

// 7
router.post("/", async (req, res) => {
    try {
        const grade = req.body;

        const json = JSON.parse(await ready());

        var grades = json.grades.filter(gr =>
            gr.subject.toLowerCase() === grade.subject.toLowerCase()
            && gr.type.toLowerCase() === grade.type.toLowerCase()
        );

        grades = grades.sort((a, b) => b.value - a.value).slice(0, 3);

        res.send(JSON.stringify(grades));

    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;