import { promises } from "fs";

const { readFile, writeFile } = promises;
const fileName = "grades.json";

export const ready = async () => {
    try {
        const data = await readFile(fileName, "utf-8");        

        return data;
    
    } catch (err) {
        throw Error("Erro ao ler o arquivo");
    }
}

export const write = async (json) => {
    try{
        await writeFile(fileName, JSON.stringify(json));
    }catch (err) {
        throw Error("Erro ao gravar o arquivo");
    }
}