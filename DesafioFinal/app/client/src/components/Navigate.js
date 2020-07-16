import React, { useEffect, useState } from 'react';
import {getAllPeriods} from '../api/apiService';
import Periods from './Periods'

export default function Navigate(props) {
    const [periods, setPeriods] = useState([]);    
    const [periodSelected, setPeriodSelected] = useState(props.defaultPeriod);
    const [firstButtonDisable, setFirstButtonDisable] = useState(false);
    const [lastButtonDisable, setLastButtonDisable] = useState(false);


    useEffect(() => {
        const fetchPeriods = async () => {            
            const json = await getAllPeriods();
            setPeriods(json);
        }

        if (periods !== [])
            fetchPeriods();        

    }, []);

    const handlePeriodChange = (selected) => {
        const idx = periods.indexOf(selected);

        setPeriodSelected(selected);

        setFirstButtonDisable(idx === 0);

        setLastButtonDisable(idx >= (periods.length - 1));

        props.onChangeYearMont(selected);
    }

    const handleFirstClick = () => {

        const idx = periods.indexOf(periodSelected);

        select(idx - 1);
    }

    const handleLastClick = () => {
        const idx = periods.indexOf(periodSelected);

        select(idx + 1);
    }

    const select = (idx) => {
        const period = periods[idx];
        handlePeriodChange(period);
    }

    return (
        <div className="container">
            <div className="row" style={styles.centered}>Controle Financeiro Pessoal</div>
            <div style={styles.centered}>
                <div className="col">
                    <button className="btn waves-effect waves-light" onClick={handleFirstClick} disabled={firstButtonDisable}>
                        <i className="material-icons">keyboard_arrow_left</i>
                    </button>
                </div>
                <Periods periods={periods} defaultPeriod={periodSelected} onChangePeriod={handlePeriodChange}></Periods>
                <div className="col">
                    <button className="btn waves-effect waves-light" onClick={handleLastClick} disabled={lastButtonDisable}>
                        <i className="material-icons">keyboard_arrow_right</i>
                    </button>
                </div>
            </div>
        </div>
    )
}

const styles = {
    centered: {
        textAlign: 'center',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center'
    }
}