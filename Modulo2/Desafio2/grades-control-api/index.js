import express from "express";
import gradeRoute from "./routes/grade.js";
import notaalunoRoute from "./routes/notaaluno.js";
import mediaRoute from "./routes/media.js"
import topgradeRoute from "./routes/topgrade.js";

const app = express();
app.use(express.json());

//Rotas
app.use("/grade", gradeRoute);
app.use("/notaaluno", notaalunoRoute);
app.use("/media", mediaRoute);
app.use("/topgrade", topgradeRoute);

//Listem
app.listen(3000, ()=>{
    console.log("App iniciado");
});