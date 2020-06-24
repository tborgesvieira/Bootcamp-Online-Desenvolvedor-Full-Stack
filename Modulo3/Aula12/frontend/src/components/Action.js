import React from 'react'

export default function Action({id, type, onActionClick}) {
    const handeIconClick = () =>{
        onActionClick(id, type);
    }

    return (
        <span 
            onClick={handeIconClick}
            className="material-icons" 
            style={{cursor: 'pointer'}}>{type}</span>
    )
}
