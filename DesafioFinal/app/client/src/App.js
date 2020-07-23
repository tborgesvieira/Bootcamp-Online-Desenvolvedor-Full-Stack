import React, { useEffect, useState } from 'react';
import * as api from './api/apiService';
import Navigate from './components/Navigate';
import Resumo from './components/Resumo';
import Detalhes from './components/Detalhes';
import Filtro from './components/Filtro';
import Spinner from './components/Spinner';
import ModalForm from './components/ModalForm';
import Novo from './components/Novo';
import ModalConfirmDelete from './components/ModalConfirmDelete';

export default function App() {

  const dt = new Date();

  const yearMonthCurrent = `${dt.getFullYear()}-${("0" + (dt.getMonth() + 1)).slice(-2)}`;

  const [period, setPeriod] = useState(yearMonthCurrent);
  const [yearMonthSelected, setYearMonthSelected] = useState([]);
  const [yearMonthFiltred, setYearMonthFiltred] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [lancamento, setLancamento] = useState(null);

  useEffect(() => {
    setYearMonthFiltred([]);
    const fetchYearMonth = async () => {
      const data = await api.getAll(period);
      setYearMonthSelected(data);
      setYearMonthFiltred(data);
    }

    if (period != null)
      fetchYearMonth();

  }, [period]);

  const handleYearMont = (selected) => {
    setPeriod(selected);
  }

  const handleFilter = (filtered) => {
    setYearMonthFiltred(filtered);
  }

  const handlePersist = (selecionado) => {
    setLancamento(selecionado);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handlePersistData = async (lancamentoPersist, isEdit) => {

    try {
      if (!isEdit) {
        await api.insert(lancamentoPersist);
      }else{
        await api.update(lancamentoPersist);
      }

      handleCloseModal();
      refresh();
    } catch{
      console.log("Falha ao gravar");
    }
  }

  const refresh = () => {
    const p = period;

    setPeriod(null);
    setPeriod(p);
  }

  const handleSelectedDelete = (lancamentoDelete) => {
    setLancamento(lancamentoDelete);
    
    setIsModalDeleteOpen(true);
  }

  const handleSelectedEdit = (lancamentoEdit) =>{
    setLancamento(lancamentoEdit);
    setIsModalOpen(true);
  }

  const handlePersistDelete = async (deletar) => {
    setIsModalDeleteOpen(false);

    if (deletar) {
      try {        
        await api.remove(lancamento._id);
        refresh();
      } catch{
        console.log("Erro ao deletar");
      }
    }
  }

  return (
    <div>
      <div className="container">
        <div style={styles.centeredTitle}>Desafio Final do Bootcamp Full Stack</div>
        <Navigate onChangeYearMont={handleYearMont} defaultPeriod={period}></Navigate>
        {yearMonthFiltred.length !== 0 && <Resumo yearMonths={yearMonthFiltred}></Resumo>}
        {yearMonthFiltred.length === 0 && <Spinner />}
      </div>
      {yearMonthFiltred.length !== 0 && <div className="container" style={{ paddingTop: '10px' }}>
        <div className="row">
          <Novo onPersist={handlePersist}></Novo>
          <Filtro yearMonths={yearMonthSelected} onFilter={handleFilter}></Filtro>
        </div>
      </div>}
      {yearMonthFiltred.length !== 0 &&
        <Detalhes
          yearMonths={yearMonthFiltred}
          onEdit={handleSelectedEdit}
          onDelete={handleSelectedDelete}></Detalhes>}
      {isModalOpen &&
        <ModalForm
          onCloseModal={handleCloseModal}
          onSave={handlePersistData}
          lancamento={lancamento}></ModalForm>}
      {isModalDeleteOpen &&
        <ModalConfirmDelete
          onDelete={handlePersistDelete}></ModalConfirmDelete>}
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
