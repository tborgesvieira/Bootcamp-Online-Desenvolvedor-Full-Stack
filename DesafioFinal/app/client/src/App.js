import React, { useEffect, useState } from 'react';
import * as api from './api/apiService';
import Navigate from './components/Navigate';
import Resumo from './components/Resumo';
import Detalhes from './components/Detalhes';
import Filtro from './components/Filtro';

export default function App() {

  const dt = new Date();

  const yearMonteCurrent = `${dt.getFullYear()}-${("0" + (dt.getMonth() + 1)).slice(-2)}`;

  const [period, setPeriod] = useState(yearMonteCurrent);
  const [yearMonthSelected, setYearMonthSelected] = useState([]);
  const [yearMonthFiltred, setYearMonthFiltred] = useState([]);

  useEffect(() => {
    const fetchYearMonth = async () => {      
      const data = await api.getAll(period);
      setYearMonthSelected(data);
      setYearMonthFiltred(data);
    }

    fetchYearMonth();

  }, [period]);

  const handleYearMont = (selected) => {
    setPeriod(selected);
  }

  const handleFilter = (filtered) =>{
    setYearMonthFiltred(filtered);
  }

  return (
    <div>
      <div className="container">
        <div style={styles.centeredTitle}>Desafio Final do Bootcamp Full Stack</div>
        <Navigate onChangeYearMont={handleYearMont} defaultPeriod={period}></Navigate>
        <Resumo yearMonths={yearMonthFiltred}></Resumo>
      </div>
      <div className="container" style={{ paddingTop: '10px' }}>
        <div className="row">
          <div className="col s3">
            <button className="btn waves-effect waves-light">
              + NOVO LANÇAMENTO
            </button>
          </div>
          <Filtro yearMonths={yearMonthSelected} onFilter={handleFilter}></Filtro>
        </div>
      </div>
      <Detalhes yearMonths={yearMonthFiltred}></Detalhes>      
    </div>
  );
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.4em',
    paddingTop: '20px'
  }
}