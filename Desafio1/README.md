<p align="center">
  <img src="/assets/bootcamp_fullstack.png">
</p>
<h1 align="center">Bootcamp-Online-Desenvolvedor-Full-Stack - Maio 2020 (IGTI)</h1>

## Instruções

### Objetivos

Exercitar os seguintes conceitos trabalhados no Módulo:

- Declarar elementos HTML como títulos, input, div, span, ul, li etc.
- Estilizar o app com CSS.
- Mapear elementos do DOM para serem manipulados com JavaScript.
- Formatar valores com JavaScript.
- Realizar diversos cálculos com array methods como map, filter e reduce.
- Realizar requisições HTTP com o comando fetch.

### Enunciado

Criar uma aplicação para filtrar usuários e mostrar estatísticas a partir do filtro definido.

### Atividades

Os alunos deverão desempenhar as seguintes atividades:

1. Na carga inicial da aplicação, obter os dados de: https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo (Links para um site externo.)
2. Carregar os dados dos usuários em um array.
3. Permitir a filtragem de usuários através de um input com interação do usuário.
4. O usuário poderá filtrar dados quando digitar pelo menos um caractere no input.
5. O usuário poderá filtrar os dados tanto digitando "Enter" quanto clicando no botão correspondente, conforme imagens mais abaixo.
6. Montar dois painéis.
7. No painel da esquerda, listar os usuários filtrados.
8. No painel da direita, calcular e mostrar algumas estatísticas sobre esses usuários, conforme imagens abaixo.

**Tela inicial da aplicação (sugestão):**

![Tela antes da busca](/assets/d1.png)

<hr />

**Tela inicial da aplicação após a busca (sugestão):**
![Tela após a busca](/assets/d2.png)

### Dicas

1. Após executar a requisição à API, filtre somente os dados necessários ao app. Esses são: name (first + last), picture, dob.age e gender.
2. Monitore o input com o evento "keyup".
3. Filtrem os dados a partir de qualquer posição no nome, ou seja, o nome "Brenda" (caso exista na API) deve ser retornado se o filtro for "a".
4. Para filtrar, considere todo o texto em minúsculas. Assim, o filtro "E" trará tanto "Elena" quanto "Helena", caso existam na API.
5. Dê um console.log() nos dados do evento de digitação e você descobrirá como "cercar" a tecla "Enter".
6. Foque mais no código JavaScript e menos na interface. O mais importante é que o filtro e os cálculos estejam corretos.
7. Quebre o seu código em funções bem definidas.
8. Será necessária uma boa dose de manipulação manual do DOM. Isso pode ser feito tanto com innerHTML + string (recomendo a utilização de template literals) ou com os comandos document.createElement, appendChild etc.
9. Se quiserem fazer uma interface semelhante à das imagens, utilizem o Materialize (https://materializecss.com).
10. Não deixem de assistir o vídeo desse desafio, onde demonstro a aplicação em funcionamento e dou mais algumas dicas.

### Resultado Final da implementação

<div style="text-align:center"><img src="/assets/Desafio_1.gif" /></div>