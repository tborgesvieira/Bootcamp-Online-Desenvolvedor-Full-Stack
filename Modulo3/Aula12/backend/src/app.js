import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { promisify } from 'util';
import winston from 'winston';
import gradesRouter from './routes/grades.js';
import { postGrade } from './routes/grades.js';

const app = express();
app.use(cors());
const exists = promisify(fs.exists);
const writeFile = promisify(fs.writeFile);
const deleteFile = promisify(fs.unlink);

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.fileName = 'grades.json';

app.use(express.json());
app.use(express.static('public'));
app.use('/images', express.static('public'));
app.use('/grade', gradesRouter);

/**
 * Função para simular algumas
 * notas e já ter algo pronto
 * na API
 */
function simulateGrades() {
  const students = ['John Petrucci', 'Mike Portnoy', 'Neal Morse'];
  const subjects = ['01 - JavaScript', '02 - Node', '03 - React'];
  const types = ['Exercícios', 'Trabalho Prático', 'Desafio'];
  const maxGrades = [10, 40, 50];

  const grades = [];

  students.forEach((student) => {
    types.forEach((type, index) => {
      subjects.forEach((subject) => {
        const value = Math.ceil(Math.random() * maxGrades[index]);

        const grade = {
          student,
          subject,
          type,
          value,
        };

        grades.push(grade);
      });
    });
  });

  const postAllGrades = async () => {
    for (let i = 0; i < grades.length; i++) {
      await postGrade(grades[i]);
    }
  };

  postAllGrades();
}

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'grades-control-api.log' }),
  ],
  format: combine(
    label({ label: 'grades-control-api' }),
    timestamp(),
    myFormat
  ),
});

app.listen(3001, async () => {
  /**
   * Reiniciando o arquivo com os dados
   * simulados. Comente a linha abaixo
   * se quiser preservar os dados
   */
  await deleteFile(global.fileName);

  try {
    const fileExists = await exists(global.fileName);
    if (!fileExists) {
      const initialJson = {
        nextId: 1,
        grades: [],
      };
      await writeFile(global.fileName, JSON.stringify(initialJson));

      simulateGrades();
    }
  } catch (err) {
    logger.error(err);
  }
  logger.info('API started!');
});
