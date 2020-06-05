import express from "express";
import gradeRouter from "./routes/grade.js";
import mediaRouter from "./routes/media.js"
import topgradeRoute from "./routes/topgrade.js";

const app = express();
app.use(express.json());

//Rotas
app.use("/grade", gradeRouter);
app.use("/media", mediaRouter);
app.use("/topgrade", topgradeRoute);

//Listem
app.listen(3000, ()=>{
    console.log("App iniciado");
});