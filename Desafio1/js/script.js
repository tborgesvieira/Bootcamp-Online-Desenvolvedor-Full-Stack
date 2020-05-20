'use strict';

const url = "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo";

let listaPessoas = [];
let btnEnviar = null;
let txtNome = null;

function start(){
    carregarLista();    

    btnEnviar = document.querySelector("#enviar");
    btnEnviar.classList.add("disabled");
    txtNome = document.querySelector("#nome");

    initNome();
}

async function carregarLista(){
    const res = await fetch(url);

    const pessoas = await res.json();
    
    listaPessoas = pessoas.results.map(pessoa=>{
        const {name, dob} = pessoa;        
        return {
            nome: name.first+" "+name.last,
            idade: dob.age
        }
    });

    console.log(listaPessoas);
}

function initNome(){
    function onKeyUpNome(event){
        let hasText = !!event.target.value && event.target.value.trim() !== '';

        if(hasText){
            btnEnviar.classList.remove("disabled");            
        }else{
            btnEnviar.classList.add("disabled");
        }

        if(hasText && event.key == 'Enter'){
            buscarNome();
        }
    }

    txtNome.addEventListener('keyup', onKeyUpNome);
}

window.addEventListener('load', start);