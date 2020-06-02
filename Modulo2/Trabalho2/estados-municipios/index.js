import {promises} from "fs";

const fs = promises;
const estadosFile = "Estados.json";
const cidadesFile = "Cidades.json";
const files = "./files";

let estados;
let cidades;

const processarArquivos = async () =>{
    estados = JSON.parse(await fs.readFile(estadosFile, "utf-8"));

    cidades = JSON.parse(await fs.readFile(cidadesFile, "utf-8"));

    estados.forEach(e => {        
        const cidadeEstado = cidades.filter(c=>c.Estado === e.ID);
        fs.writeFile(`${files}/${e.Sigla}.json`,JSON.stringify(cidadeEstado));
    });    
}

const lerQuantidadeEstado = async (estado) =>{
    
    const cidadesFile = JSON.parse(await fs.readFile(`${files}/${estado}.json`, "utf-8"));

    return cidadesFile.length;
}

const quantidadePorUf = async () =>{
    let quantidades = [];        

    await Promise.all(estados.map(async (e)=>{
        let qtd = await lerQuantidadeEstado(e.Sigla);
        
        let estadoObj = {Sigla: e.Sigla, Quantidade: qtd}; 
        
        quantidades.push(estadoObj);
    }));      

    return quantidades;
}

const cincoMaisUF = (quantidades) =>{
    quantidades = quantidades.sort((a, b) => b.Quantidade - a.Quantidade);    

    let quantidadesRetorno = [];
    let qtd = 0;

    for(let i=0; i<5; i++){
        quantidadesRetorno.push(`${quantidades[i].Sigla} - ${quantidades[i].Quantidade}`);
        qtd += quantidades[i].Quantidade;
    }
    console.log("3: ");
    console.log(quantidadesRetorno);
    console.log("Soma das quantidades: "+ qtd);
}

const cincoMenosUF = (quantidades) =>{
    quantidades = quantidades.sort((a, b) => a.Quantidade - b.Quantidade);    
    
    let quantidadesRetorno = [];
    let qtd = 0;

    for(let i=5; i>0; i--){
        quantidadesRetorno.push(`${quantidades[i-1].Sigla} - ${quantidades[i-1].Quantidade}`);
        qtd += quantidades[i-1].Quantidade;
    }

    console.log("4: ");
    console.log(quantidadesRetorno);    
    console.log("Soma das quantidades: "+ qtd);
}

const obterMaiorNomeCidadePorUf = async (estado) =>{
    const cidadesFile = JSON.parse(await fs.readFile(`${files}/${estado}.json`, "utf-8"));

    cidadesFile
    .sort((a, b) => a.Nome.localeCompare(b.Nome))
    .sort((a, b) => b.Nome.length - a.Nome.length);    

    const cid = {Sigla: estado, ...cidadesFile[0]};
    return cid
}

const obterMenorNomeCidadePorUf = async (estado) =>{
    const cidadesFile = JSON.parse(await fs.readFile(`${files}/${estado}.json`, "utf-8"));

    cidadesFile
    .sort((a, b) => a.Nome.localeCompare(b.Nome))
    .sort((a, b) => a.Nome.length - b.Nome.length);

    const cid = {Sigla: estado, ...cidadesFile[0]};

    return cid;
}

const nomesMaioresDasUFs = async () =>{
    let ufs = [];

    await Promise.all(estados.map(async (e)=>{
        let cid = await obterMaiorNomeCidadePorUf(e.Sigla);            
        
        ufs.push(cid);
    }));  

    let nomes = [];
    ufs.sort((a, b) => a.Sigla.localeCompare(b.Sigla)).forEach(e=>{
        nomes.push(`${e.Nome} - ${e.Sigla}`);
    });    

    console.log("5: ");
    console.log(nomes);
}

const nomesMenoresDasUFs = async () =>{
    let ufs = [];

    await Promise.all(estados.map(async (e)=>{
        let cid = await obterMenorNomeCidadePorUf(e.Sigla);            
        
        ufs.push(cid);
    }));  

    let nomes = [];
    ufs.sort((a, b) => a.Sigla.localeCompare(b.Sigla)).forEach(e=>{
        nomes.push(`${e.Nome} - ${e.Sigla}`);
    });    

    console.log("6: ");
    console.log(nomes);
}

const nomeMaiorCidade = () =>{
    let cidadesMaior = cidades.sort((a, b) => a.Nome.localeCompare(b.Nome)).sort((a, b) => b.Nome.length - a.Nome.length)[0];
    
    let estadoCidade = estados.find(e => e.ID === cidadesMaior.Estado);

    console.log("7:");
    console.log(`${cidadesMaior.Nome} - ${estadoCidade.Sigla}`)    
}

const nomeMenorCidade = () =>{
    let cidadesMenor = cidades.sort((a, b) => a.Nome.localeCompare(b.Nome)).sort((a, b) => a.Nome.length - b.Nome.length)[0];
    
    let estadoCidade = estados.find(e => e.ID === cidadesMenor.Estado);
    
    console.log("8:");
    console.log(`${cidadesMenor.Nome} - ${estadoCidade.Sigla}`)        
}

processarArquivos().then(async()=>{
    let quantidades = await quantidadePorUf();
    
    cincoMaisUF(quantidades);

    cincoMenosUF(quantidades);

    await nomesMaioresDasUFs();

    await nomesMenoresDasUFs();

    nomeMaiorCidade();

    nomeMenorCidade();
});