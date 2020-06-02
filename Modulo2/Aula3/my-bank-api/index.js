import express from "express";
import {promises} from "fs";
import winston from "winston";
import accountsRouter from "./routes/accounts.js";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./doc.js";
import cors from "cors";

const app = express();

const readFile = promises.readFile;
const writeFile = promises.writeFile;

global.file = "./accounts.json";

const {combine, timestamp, label, printf} = winston.format;

const myFormat = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: "my-bank-api.log"})
    ],
    format: combine(
        label({label: "my-bank-api"}),
        timestamp(),
        myFormat   
    )
});

app.use(express.json());
app.use(cors());
app.use("/account", accountsRouter);
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(3000, async() =>{
    logger.info("API Started!");
    try {
        await readFile(global.file, "utf-8");
                
    } catch (err) {
        const initJson = {
            nextId: 1,
            accounts: []
        };
        
        writeFile(file, JSON.stringify(initJson))
        .then(() =>{
            console.log(global.file+" criado");
        })
        .catch(e => {
            logger.error(e);
        });
    }
});
