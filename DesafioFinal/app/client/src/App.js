import React, { useState } from 'react';
import Navigate from './components/Navigate';

export default function App() {
  const [period, setPeriod] = useState('2020-07');

  const handleYearMont = (selected) =>{
    setPeriod(selected);        
  }

  return (
    <div className="container">
      <div style={styles.centeredTitle}>Desafio Final do Bootcamp Full Stack</div>
      <Navigate onChangeYearMont={handleYearMont} defaultPeriod={period}></Navigate>
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