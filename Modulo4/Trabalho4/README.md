<p align="center">
  <img src="/assets/bootcamp_fullstack.png">
</p>
<h1 align="center">Bootcamp-Online-Desenvolvedor-Full-Stack - Maio 2020 (IGTI)</h1>

# Trabalho Prático do Módulo 4

## Objetivos
Exercitaros seguintes conceitos trabalhados noMódulo::

- Implementar uma API e integra-laao MongoDB.
- Persistência de Dados no MongoDB Atlas (Daas).
- Estruturação e persistência dos dados pelo mongoose.

## Enunciado

O  aluno  deverá implementar  uma  API  integradaao  MongoDB  Atlas cujo o schemados dados será definido pelo mongoose. Esta API terá alguns endpoints para manipulação dos dados.

## Atividades

O aluno deverá baixar os arquivos Cidades.json e Estados.json do link a seguir (https://github.com/felipefdl/cidades-estados-brasil-json (Links para um site externo.)) e colocá-los dentro do seu projeto. O arquivo Estados.json possui uma listagem com todos os estados do Brasil, cada um representado por um ID. No arquivo Cidades.json estão listadas todas as cidades do Brasil, com seu respectivo estado representando pelo ID fazendo referência ao arquivo Estados.json.

O aluno deverá baixar o arquivo com os dados para a carga inicial na base de dadose desempenhar as seguintes atividades:

1. Criar  um  banco  de  dados  no  MongoDB  Atlas,  uma  coleção  e  importar  os  dados arquivo “accounts.json” em sua coleção.
2. Implementar  um  modelo(schema)para  esta  coleção,considerando  que  todos  os campos são requeridose o campo balance não pode ser menor que 0. 
3. Criar o projeto my-bank-api para implementação dos endpoints.
4. Crie um endpoint para registrar um depósito em uma conta. Este endpoint deverá receber como parâmetros a “agencia”, o número da“conta”e o valor do depósito. Ele deverá atualizar o “balance” da  conta,  incrementando-o  com  o  valor  recebido como parâmetro. O endpoint deverá validar se a conta informada existe, caso não exista deverá retornar um erro, caso exista retornar o saldo atual da conta.
5. Crie  um  endpoint  para  registrar  um  saque  em  uma  conta.  Este  endpoint  deverá receber como parâmetros a “agência”, o número da “conta” e o valor do saque. Ele deverá atualizar o “balance” da conta, decrementando-o com o valor recebido com parâmetroe cobrando uma tarifa de saque de (1). O endpoint deverá validar se a conta informada existe, caso não exista deverá retornar um erro, caso exista retornar o  saldo atual da  conta.Também  deverá  validar  se  a  conta  possui saldo  suficiente para aquele saque, se não tiver deverá retornar um erro, não permitindo assim que o saque fique negativo.
6. Crie  um  endpoint  para  consultar  o  saldo  da  conta.  Este  endpoint  deverá  receber como parâmetro a “agência” e o número da “conta”,e deverá retornar seu “balance”. Caso a conta informada não exista, retornar um erro.
7. Crie  um  endpoint  para  excluir  uma  conta.  Este  endpoint  deverá  receber  como parâmetro a “agência” e o número da “conta” da contae retornar o número de contasativaspara esta agência.
8. Crie  um  endpoint  para  realizar  transferências  entre  contas.Este  endpoint  deverá receber como parâmetro o número da “conta” origem, o número da “conta” destino e o  valor  de  transferência.  Este  endpoint  deve  validar  se  as  contas  são  da  mesma agência para realizar a transferência, caso seja de agências distintas o valor de tarifa de transferencia (8) deve ser debitado na “conta” origem.O endpoint deverá retornar o saldo da conta origem.
9. Crie  um  endpoint  para  consultar  a  média  do  saldo  dos  clientes  de  determinada agência. O endpoint deveráreceber como parametro a “agência” e deverá retornar o balancemédio da conta.
10. Crie um endpoint para consultar os clientes com o menor saldo em conta. O endpoint devera receber como parâmetro um valor numérico para determinar a quantidade de clientes  a  serem  listados,e  o  endpoint  deverá  retornar  em  ordem  crescente  pelo saldo a lista dos clientes (agência, conta, saldo).
11. Crie um endpoint para consultar os clientes mais ricos do banco. O endpoint deveráreceber como parâmetro um valor numérico para determinar a quantidade de clientes a  serem  listados,e  o endpoint deverá  retornar  em ordem  decrescente pelo  saldo, crescente pelo nome,a lista dos clientes (agência, conta,nomeesaldo).
12. Crie  um  endpoint  que  irá  transferir  o  cliente  com  maior  saldo  em  contade  cada agênciapara a agência private agencia=99. O endpoint deverá retornar a lista dos clientes da agencia private.