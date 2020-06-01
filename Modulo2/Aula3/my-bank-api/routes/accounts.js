import express from "express";
import {promises} from "fs";

const router = express.Router();

const readFile = promises.readFile;
const writeFile = promises.writeFile;

router.post("/", async (req, res) => {
    let account = req.body;

    try {
        let data = await readFile(global.file, "utf-8");

        let json = JSON.parse(data);

        account = { id: json.nextId++, ...account };

        json.accounts.push(account);

        await writeFile(global.file, JSON.stringify(json));

        res.end();

        logger.info(`POST /account - ${JSON.stringify(account)}`);
    }
    catch (err) {
        res.status(400).send({ error: err.message });
        logger.error(`POST /account - ${err.message}`);
    }
});

router.get("/", async (_, res) => {
    try {
        var data = await readFile(global.file, "utf-8");

        let json = JSON.parse(data);

        delete json.nextId;

        res.send(json);
        logger.info("GET /account");

    } catch (err) {
        res.status(400).send({ error: err.message });
        logger.error(`GET /account - ${err.message}`);
    }

});

router.get("/:id", async (req, res) => {

    try {
        var data = await readFile(global.file, "utf-8");

        let json = JSON.parse(data);

        let account = json.accounts.find(r => r.id === parseInt(req.params.id));

        if (account) {
            res.send(account);
            logger.info(`GET /account/:id - ${JSON.stringify(account)}`);
        } else {
            res.end();
            logger.info("GET /account/:id");
        }

    } catch (err) {
        res.status(400).send({ error: err.message });
        logger.error(`GET /account:id - ${err.message} - id:${req.params.id}`);
    }

});

router.delete("/:id", async (req, res) => {
    try {
        var data = await readFile(global.file, "utf-8");

        let json = JSON.parse(data);

        json.accounts = json.accounts.filter(r => r.id !== parseInt(req.params.id));

        await writeFile(global.file, JSON.stringify(json));

        res.end();

        logger.info(`DELETE /account/:id - ${req.params.id}`);
    } catch (err) {
        res.status(400).send({ error: err.message });
        logger.error(`DELETE /account:id - ${err.message} - id:${req.params.id}`);
    }
});

router.put("/", async (req, res) => {
    let account = req.body;
    try {
        var data = await readFile(global.file, "utf-8");

        let json = JSON.parse(data);

        let index = json.accounts.findIndex(ac => ac.id === account.id);

        json.accounts[index] = account;

        await writeFile(global.file, JSON.stringify(json));

        res.end();

        logger.info(`PUT /account/ - ${JSON.stringify(account)}`);
    } catch (err) {
        res.status(400).send({ error: err.message });
        logger.error(`PUT /account:id - ${err.message} - id:${req.params.id}`);
    }
});

router.post("/transaction", async (req, res) => {
    let params = req.body;

    try {
        var data = await readFile(global.file, "utf-8");

        let json = JSON.parse(data);

        let index = json.accounts.findIndex(ac => ac.id === params.id);

        if ((params.value < 0) && ((json.accounts[index].balance + params.value) < 0))
            throw Error("Nao há saldo suficiente!");

        json.accounts[index].balance += params.value;

        await writeFile(global.file, JSON.stringify(json));

        res.end(JSON.stringify(json.accounts[index]));

    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

export default router;