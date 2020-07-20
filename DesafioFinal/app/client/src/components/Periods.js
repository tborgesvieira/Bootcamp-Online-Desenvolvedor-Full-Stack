import React from 'react';

export default function Periods(props) {

    const {periods, defaultPeriod} = props;
    
    const onChangePeriod = (event) =>{        
        props.onChangePeriod(event.target.value);
    }    

    const getDataFormatada = (item) =>{
        var mes = (+item.split('-')[1])-1;

        const mesNome = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
                            "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

        return `${mesNome[mes]} / ${item.split('-')[0]}`;
    }

    return (
        <div className="col">
                    <select className="browser-default" value={defaultPeriod} onChange={onChangePeriod}>
                        {periods.length > 0 && periods.map(item => {
                            return (<option key={item} value={item}>{getDataFormatada(item)}</option>)
                        })}
                    </select>                    
                </div>
    )
}
