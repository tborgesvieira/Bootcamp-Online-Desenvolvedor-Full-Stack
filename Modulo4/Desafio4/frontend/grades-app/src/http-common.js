import axios from 'axios';

//Define a URL base da origem para consumo do servico
export default axios.create({
  baseURL: 'http://localhost:5500/',
  headers: {
    'Content-type': 'application/json',
  },
});
