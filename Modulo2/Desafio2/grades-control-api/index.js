import express from "express";
import gradeRouter from "./routes/grade.js";

const app = express();
app.use(express.json());

//Rotas
app.use("/grade", gradeRouter);

//Listem
app.listen(3000, ()=>{
    console.log("App iniciado");
});