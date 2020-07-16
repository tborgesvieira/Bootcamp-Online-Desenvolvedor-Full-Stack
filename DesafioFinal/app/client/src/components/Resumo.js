import React from 'react'

export default function Resumo(props) {
    const { yearMonths } = props;    

    const ObterReceitas = () =>{
        const receitas = yearMonths.reduce((acc, cur)=>{            
            if(cur.type === "+")
                return acc + cur.value;

            return acc;
        }, 0);

        return receitas.toLocaleString('pt-br', {minimumFractionDigits: 2});
    }

    const ObterDespesas = () =>{
        const receitas = yearMonths.reduce((acc, cur)=>{            
            if(cur.type === "-")
                return acc + cur.value;

            return acc;
        }, 0);

        return receitas.toLocaleString('pt-br', {minimumFractionDigits: 2});
    }

    const ObterSaldo = () =>{
        const receitas = yearMonths.reduce((acc, cur)=>{            
            if(cur.type === "+")
                return acc + cur.value;
            else
                return acc - cur.value;
        }, 0);

        return receitas.toLocaleString('pt-br', {minimumFractionDigits: 2});
    }

    return (
        <div style={styles.detalhes}>
            <div className="row">
                <div className="col s3" style={{textAlign:'left'}}>
                    Lançamentos: {yearMonths.length}
                </div>
                <div className="col s3" style={{textAlign:'center'}}>
                    Receitas: <span style={{color:'rgb(70, 160, 151)'}}>R$ {ObterReceitas()}</span>
                </div>
                <div className="col s3" style={{textAlign:'center'}}>
                    Despesas: <span style={{color:'rgb(187, 61, 47)'}}>R$ {ObterDespesas()}</span>
                </div>
                <div className="col s3" style={{textAlign:'right'}}>
                    Saldo: <span style={{color: !ObterSaldo().startsWith("-") ?'rgb(70, 160, 151)' : 'rgb(187, 61, 47)'}}>R$ {ObterSaldo()}</span>
                </div>
            </div>
        </div>
    )
}

const styles = {
    detalhes: {        
        paddingTop: '20px',
        border: '1px solid gray',
        borderRadius: '5px',
        fontWeight:'bold'
    }
}