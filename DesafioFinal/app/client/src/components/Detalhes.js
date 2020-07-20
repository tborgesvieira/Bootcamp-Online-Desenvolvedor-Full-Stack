import React from 'react'

export default function Detalhes({yearMonths, onDelete, onEdit}) {
    
    const handleEdit = (item) => {
        onEdit(item);
    }

    const handleDelete = (item) =>{
        onDelete(item);
    }

    return (
        <div className="container">
            {yearMonths.map((item) => {
                return (
                    <div key={"div_"+item._id} className="row" style={{ backgroundColor: item.type === '-' ?'rgb(235, 161, 168)':'rgb(169, 240, 219)', 
                                            border: '1px solid gray', 
                                            borderRadius: '5px', 
                                            display: 'flex' }}>
                        <div className="col s1" style={{ fontSize: '1.2em', fontWeight: 'bold', padding: '15px' }}>
                            {item.day}
                        </div>
                        <div className="col s8">
                            <div style={{ fontWeight: 'bold', fontSize: '1.1em', }}>
                                {item.category}
                            </div>
                            <div style={{ fontSize: '0.8em' }}>
                                {item.description}
                            </div>
                        </div>
                        <div className="col s2 valign-wrapper" style={{fontSize: '1.6em', paddingRight:'10px'}}>
                            R$ {item.value.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="col s1 right-align valign-wrapper" style={{display:'flex', textAlign:'right'}}>
                            <a className="waves-effect waves-teal btn-flat" onClick={() => handleEdit(item)} alt={item.description}>
                                <i className="tiny material-icons">edit</i>
                            </a>
                            <a className="waves-effect waves-teal btn-flat" onClick={() => handleDelete(item)} alt={item.description}>
                                <i className="tiny material-icons">delete</i>
                            </a>
                        </div>
                    </div>)
            })}
        </div>
    )
}