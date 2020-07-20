import React, { useState, useEffect } from 'react';

import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ModalForm({ onCloseModal, onSave, lancamento }) {

    const [objectLancamento, setObjectLancamento] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (lancamento !== null) {
            setObjectLancamento(lancamento);
            setIsEdit(true);            
            return;
        }

        const dt = new Date();

        const day = ("0" + (dt.getDate())).slice(-2);

        const month = ("0" + (dt.getMonth() + 1)).slice(-2);

        const lanc = {
            value: 0,
            category: '',
            description: '',
            year: dt.getFullYear(),
            month: +month,
            day: +day,
            yearMonth: `${dt.getFullYear()}-${month}`,
            yearMonthDay: `${dt.getFullYear()}-${month}-${day}`,
            type: "-",
        };
        
        setObjectLancamento(lanc);

    }, [])

    const validar = () =>{
        const lanc = objectLancamento;
        
        const valido = lanc.description !== null &&
                       lanc.description !== '' &&
                       lanc.category !== null &&
                       lanc.category !== '' &&
                       lanc.value > 0;
        
        setIsValid(valido);
    }

    const handleClose = () => {
        onCloseModal();
    }

    const handleTipoLancamento = (event) => {        
        
        const lanc = objectLancamento;

        lanc.type = event.target.value;

        setObjectLancamento(lanc);

        validar();
    }

    const handleDescription = (event) =>{

        const lanc = objectLancamento;

        lanc.description = event.target.value;

        setObjectLancamento(lanc);

        validar();
    }

    const handleCategory = (event) =>{
        const lanc = objectLancamento;

        lanc.category = event.target.value;

        setObjectLancamento(lanc);

        validar();
    }

    const handleValue  = (event) =>{
        const lanc = objectLancamento;

        lanc.value = +event.target.value;

        setObjectLancamento(lanc);

        validar();
    }

    const handleDate = (event) =>{
        const lanc = objectLancamento;

        const dt = event.target.value.split("-");

        console.log(dt);

        lanc.year = +dt[0];

        lanc.month = +dt[1];

        lanc.day = +dt[2];

        lanc.yearMonth = `${dt[0]}-${dt[1]}`;

        lanc.yearMonthDay = event.target.value;

        setObjectLancamento(lanc);

        validar();
    }

    const handleClickSave = () =>{
        if(!isValid) return;

        onSave(objectLancamento, isEdit);
    }

    return (
        <div>
            <Modal isOpen={true} style={customStyles}>
                <div style={styles.flexRow}>
                    <span style={styles.title}>{lancamento === null ? 'Incluir' : 'Editar'} Lançamento</span>
                    <button className="waves-effect waves-lights btn red dark-4"
                        onClick={handleClose}>
                        X
                    </button>
                </div>
                <div className="row">
                    <div className="col s6">
                        <label>
                            <input name="tipo" type="radio"
                                disabled={isEdit}
                                defaultChecked={objectLancamento != null && objectLancamento.type === '-'}
                                onChange={handleTipoLancamento}
                                value="-" />
                            <span>Despesa</span>
                        </label>
                    </div>
                    <div className="col s6">
                        <label>
                            <input name="tipo" type="radio"
                                disabled={isEdit}
                                defaultChecked={objectLancamento != null && objectLancamento.type === '+'}
                                onChange={handleTipoLancamento} 
                                value = "+" />
                            <span>Receita</span>
                        </label>
                    </div>
                    <div className="input-field col s12">
                        <input 
                            placeholder="Informe uma descrição" 
                            id="description" 
                            name="description" 
                            type="text" 
                            className="validate" 
                            defaultValue={objectLancamento != null && objectLancamento.description} 
                            onChange={handleDescription} />
                        <label htmlFor="description" className="active">Descrição</label>
                    </div>
                    <div className="input-field col s12">
                        <input 
                            placeholder="Informe uma categoria" 
                            id="category" 
                            name="category" 
                            type="text" 
                            className="validate"
                            defaultValue={objectLancamento != null && objectLancamento.category} 
                            onChange={handleCategory} />
                        <label htmlFor="category" className="active">Categoria</label>
                    </div>
                    <div className="input-field col s6">
                        <input 
                            id="value" 
                            name="value" 
                            type="number" 
                            step=".01" 
                            min= "0"
                            className="validate" 
                            defaultValue={objectLancamento != null && objectLancamento.value} 
                            onChange={handleValue} />
                        <label htmlFor="value" className="active">Valor</label>
                    </div>
                    <div className="input-field col s6">
                        <input 
                            id="date" 
                            name="date" 
                            type="date" 
                            className="validate" 
                            defaultValue={objectLancamento != null && objectLancamento.yearMonthDay} 
                            onChange={handleDate} />
                        <label htmlFor="date" className="active">Data</label>
                    </div>
                </div>
                <div className="row">
                    <button className="btn waves-effect waves-light" disabled={!isValid} onClick={handleClickSave}>
                        Salvar
                    </button>
                </div>
                <div>

                </div>
            </Modal>
        </div>
    )
}
const styles = {
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '40px'
    },
    title: {
        fontSize: '1.3rem',
        fontWeight: 'bold'
    },
    erroMessage: {
        color: 'red',
        fontWeight: 'bold'
    },
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    overlay: { zIndex: 1000 }
};