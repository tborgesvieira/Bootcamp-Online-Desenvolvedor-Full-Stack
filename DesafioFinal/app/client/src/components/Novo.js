import React from 'react'

export default function Novo({onPersist}) {

    const handleNovoLancamento = () =>{
        onPersist(null);
    }

    return (
        <div className="col s3">
            <button className="btn waves-effect waves-light" onClick={handleNovoLancamento}>
              + NOVO LANÇAMENTO
            </button>
          </div>
    )
}
