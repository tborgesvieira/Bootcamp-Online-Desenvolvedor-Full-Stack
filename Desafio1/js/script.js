'use strict';

const url = "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo";

let listaPessoas = [];
let btnEnviar = null;
let txtNome = null;
let caixaUsuario = null;
let caixaEstatistica = null;
let numberFormat = Intl.NumberFormat('pt-BR');

const start = () =>{
    carregarLista();    

    carregaElementos();
    
    btnEnviar.classList.add("disabled");
    
    btnEnviar.addEventListener('click', buscarNome);

    initNome();
}

window.addEventListener('load', start);

const carregaElementos = () =>{
    btnEnviar = document.querySelector("#enviar");    
    txtNome = document.querySelector("#nome");
    caixaUsuario = document.querySelector("#usuario");
    caixaEstatistica = document.querySelector("#estatisticas");
}

const carregarLista = async ()=>{
    const res = await fetch(url);

    const pessoas = await res.json();
    
    listaPessoas = pessoas.results.map(pessoa=>{
        const {name, dob, picture, gender} = pessoa;        
        return {
            nome: name.first+" "+name.last,
            idade: dob.age,
            img: picture.thumbnail,
            sexo: gender ==='female' ? "F" : "M",
        }
    });

    ativarTela();
}

const ativarTela = () =>{
    setTimeout(()=>{
        document.querySelector("body").removeChild(document.querySelector("#loading"));
        document.querySelector("#container").classList.remove("preload");
    }, 3000);    
}

const initNome = () =>{
    const onKeyUpNome = (event) =>{
        let hasText = !!event.target.value && event.target.value.trim() !== '';

        if(hasText){
            btnEnviar.classList.remove("disabled");            
        }else{
            btnEnviar.classList.add("disabled");
            limparCaixas();
        }

        if(hasText && event.key == 'Enter'){
            buscarNome();
        }
    }

    txtNome.addEventListener('keyup', onKeyUpNome);
    limparCaixas();
}

const limparCaixas = () =>{
    caixaUsuario.innerHTML = "<strong>Nenhum usuário filtrado</strong>";
    caixaEstatistica.innerHTML = "<strong>Nada a ser exibido</strong>";
}

const buscarNome = () =>{
    var nome = txtNome.value.toLowerCase();

    let filtro = listaPessoas.filter(p=>{
        return p.nome.toLowerCase().includes(nome);
    });

    carregaUsuarios(filtro);

    carregarEstatisticas(filtro);
}

const carregaUsuarios = (filtro) =>{
    
    var div = "";

    if(filtro.length === 1){
        div = "<strong>1 usuário encontrado</strong>";
    }else{
        div = `<strong>${filtro.length} usuários encontrados</strong>`;
    }        
    
    filtro.forEach(p=>{
        div += 
        `
        <div class="row-text">
            <div><img src="${p.img}" alt="${p.nome}" class="thumbnail"></div>
            <div class="text">${p.nome}, ${p.idade} anos</div>
        </div>
        `;
    });    

    caixaUsuario.innerHTML = div;
}

const carregarEstatisticas = (filtro) =>{
    var div = "<strong>Estatísticas</strong>";

    var masculino = filtro.filter(p=>{return p.sexo === 'M'}).length;
    
    var feminino = filtro.filter(p=>{return p.sexo === 'F'}).length;

    var idades = filtro.reduce((accumulator, current)=>{
        return accumulator+current.idade;
    }, 0);

    var media = numberFormat.format((idades / filtro.length).toFixed(2));

    div += `
        <div class="row-text">
            <div class="text">Sexo masculino: <strong>${masculino}</strong></div>
        </div>
        <div class="row-text">
            <div class="text">Sexo feminino: <strong>${feminino}</strong></div>
        </div>
        <div class="row-text">
            <div class="text">Soma das idades: <strong>${idades}</strong></div>
        </div>
        <div class="row-text">
            <div class="text">Média das idades: <strong>${media}</strong></div>
        </div>
    `;

    caixaEstatistica.innerHTML = div;
}