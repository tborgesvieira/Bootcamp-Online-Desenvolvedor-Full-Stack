import React from 'react'

export default function Filtro(props) {
    
    const {yearMonths} = props;

    const handleOnChange = (event) =>{                
         props.onFilter(yearMonths.filter((item)=>{
             return item.descriptionLower.includes(event.target.value.toLowerCase())
         }));
    }

    return (
        <div className="col s9">
            <input id="busca" type="text" onChange={handleOnChange} />
        </div>
    )
}
