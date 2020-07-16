const mongoose = require('mongoose');
const fs = require('fs').promises;

const dotenv = require('dotenv');
dotenv.config();

const TRANSACTIONS_COLLECTION = 'transactions';

/**
 * Crie um arquivo .env na raiz da pasta 'utils' e
 * preencha os valores conforme o arquivo de
 * exemplo "".env.example"
 *
 * DB_CONNECTION
 */
const { DB_CONNECTION } = process.env;

console.log('Iniciando conexão ao MongoDB...');
mongoose.connect(
  DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error(`Erro na conexão ao MongoDB - ${err}`);
      process.exit(1);
    }
  }
);

const { connection } = mongoose;

connection.once('open', () => {
  console.log('Conectado ao MongoDB');
  recreateCollections();
});

async function recreateCollections() {
  console.log('Eliminando as collections...');
  await dropCollections();

  console.log('Recriando as collections...');
  await createCollections();

  console.log('Preenchendo os documentos das collections...');
  await populateCollections();

  connection.close();
  console.log('Processamento finalizado!');
}

async function dropCollections() {
  const promiseTransactions = new Promise((resolve, reject) => {
    connection.db
      .dropCollection(TRANSACTIONS_COLLECTION)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        if (err.code === 26) {
          resolve();
          return;
        }

        reject(err);
      });
  });

  await Promise.all([promiseTransactions]);
}

async function createCollections() {
  const promiseTransactions = new Promise((resolve, reject) => {
    connection.db
      .createCollection(TRANSACTIONS_COLLECTION)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });

  await Promise.all([promiseTransactions]);
}

async function populateCollections() {
  const promiseTransactions = new Promise(async (resolve, reject) => {
    const stringArrayTransactions = await fs.readFile(
      './official-db/transactionsArray.json',
      'utf-8'
    );

    const transactions = JSON.parse(stringArrayTransactions);

    connection.db
      .collection(TRANSACTIONS_COLLECTION)
      .insertMany(transactions)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });

  await Promise.all([promiseTransactions]);
}
