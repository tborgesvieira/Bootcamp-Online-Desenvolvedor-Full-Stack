import React, { useEffect, useState } from 'react';
import Periods from './Periods'

export default function Navigate(props) {
    const [periods, setPeriods] = useState([]);
    const [periodSelected, setPeriodSelected] = useState(props.defaultPeriod);
    const [firstButtonDisable, setFirstButtonDisable] = useState(false);
    const [lastButtonDisable, setLastButtonDisable] = useState(false);
    
    
    useEffect(()=>{            
        const fetchPeriods = async() =>{
            const res = await fetch('http://localhost:3001/api/transaction/periods');
            const json = await res.json();
            setPeriods(json);
        }
        fetchPeriods();                        
    }, []);

    const handlePeriodChange = (selected) =>{
        const idx = periods.indexOf(selected);

        setPeriodSelected(selected);

        setFirstButtonDisable(idx === 0);

        setLastButtonDisable(idx >= (periods.length-1));

        props.onChangeYearMont(selected);
    }

    const handleFirstClick = () =>{
        
        const idx = periods.indexOf(periodSelected);

        select(idx - 1);
    }

    const handleLastClick = ()=>{
        const idx = periods.indexOf(periodSelected);

        select(idx + 1);
    }

    const select = (idx) =>{
        const period = periods[idx];        
        handlePeriodChange(period);
        console.log(period);
    }

    return (
        <div className="container">
            <div className="row" style={styles.centered}>Controle Financeiro Pessoal</div>
            <div style={styles.centered} className="row">
                <div className="col s4">
                    <button className="btn waves-effect waves-light" onClick={handleFirstClick} disabled={firstButtonDisable}>
                        <i className="material-icons">keyboard_arrow_left</i>
                    </button>
                </div>
                <Periods periods={periods} defaultPeriod={periodSelected} onChangePeriod={handlePeriodChange}></Periods>
                <div className="col s4">
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
        padding: '20px'
    }
}