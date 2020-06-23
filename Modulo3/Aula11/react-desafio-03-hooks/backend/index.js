/**
 * Precisamos do express para montar a API
 */
const express = require('express');

/**
 * Precisamos de cors para não termos problemas
 * de acesso à API
 */
const cors = require('cors');

/**
 * Instanciando o app com express()
 */
const app = express();

/**
 * Indicando que app utilizará o módulo de cors
 */
app.use(cors());

/**
 * Estado da aplicação
 */
let candidates = [];

/**
 * Intervals que serão executados
 * a cada x intervalo de tempo
 */
let intervalVotes = null;
let intervalPopularity = null;

/**
 * Valores constantes importantes
 */
const CONSTS = {
  MAX_POPULARITY: 10,
  MIN_POPULARITY: 1,
  MIN_VOTES: 1,
  MAX_VOTES: 1000,
  INTERVAL_VOTES: 100,
  INTERVAL_POPULARITY: 10000,
};

/**
 * Função para gerar números aleatórios
 */
function generateRandomNumber(from = CONSTS.MIN_VOTES, to = CONSTS.MAX_VOTES) {
  return Math.max(from, Math.ceil(Math.random() * to));
}

/**
 * Função para montar estado
 * inicial dos candidatos
 */
function fillCandidates() {
  candidates = [
    {
      id: 1,
      name: 'Marco Minnemann',
      votes: 0,
      previousVotes: 0,
      percentage: 0,
      popularity: CONSTS.MIN_POPULARITY,
    },

    {
      id: 2,
      name: 'Mike Portnoy',
      votes: 0,
      previousVotes: 0,
      percentage: 0,
      popularity: CONSTS.MIN_POPULARITY,
    },

    {
      id: 3,
      name: 'Neil Peart',
      votes: 0,
      previousVotes: 0,
      percentage: 0,
      popularity: CONSTS.MIN_POPULARITY,
    },
  ];
}

/**
 * Função para simular a votação
 */
function simulateVoting() {
  intervalVotes = setInterval(() => {
    candidates.forEach((candidate) => {
      const minVotes = CONSTS.MIN_VOTES;
      const maxVotes = CONSTS.MAX_VOTES * candidate.popularity;

      const votes = generateRandomNumber(minVotes, maxVotes);

      candidate.previousVotes = candidate.votes;
      candidate.votes += votes;
    });
  }, CONSTS.INTERVAL_VOTES);
}

/**
 * Função para simular a popularidade
 */
function simulatePopularity() {
  intervalPopularity = setInterval(() => {
    candidates.forEach((candidate) => {
      candidate.popularity = generateRandomNumber(
        CONSTS.MIN_POPULARITY,
        CONSTS.MAX_POPULARITY
      );
    });

    console.log(candidates);
  }, CONSTS.INTERVAL_POPULARITY);
}

/**
 * Rota padrão (/)
 */
app.get('/', (_, res) => {
  res.json({
    message:
      'Bem-vindo ao módulo de votação!' +
      'Acesse /votes para visualizar a votação em tempo real.',
  });
});

/**
 * Rota /votes
 */
app.get('/votes', (_, res) => {
  /**
   * Clonando objeto de votação e
   * realizando a ordenação a partir
   * dos votos
   */
  const sortedCandidates = Object.assign([], candidates);
  sortedCandidates.sort((a, b) => b.votes - a.votes);

  /**
   * Obtendo o total de votos do momento
   */
  const totalVotes = sortedCandidates.reduce((accumulator, current) => {
    return accumulator + current.votes;
  }, 0);

  /**
   * Cálculo de percentual de votos
   */
  sortedCandidates.forEach((candidate) => {
    candidate.percentage = (candidate.votes / totalVotes) * 100;
  });

  /**
   * Mostrando dados no console
   *
   */
  console.log({ candidates: sortedCandidates, totalVotes });

  /**
   * Retornando os dados
   */
  res.json({ candidates: sortedCandidates, totalVotes });
});

/**
 * Iniciando o servidor
 * na porta 8080
 */
app.listen(8080);

/**
 * Execução inicial
 */
fillCandidates();
simulateVoting();
simulatePopularity();
