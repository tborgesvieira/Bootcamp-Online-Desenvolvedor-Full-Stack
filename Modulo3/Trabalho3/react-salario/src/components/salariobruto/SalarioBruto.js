import React, { Component } from 'react'

export default class SalarioBruto extends Component {
    handleChangeSalarioBruto = (event) => {
        this.setValueInput(event.target.value);
    }

    setValueInput = (value) => {
        const { onChangeSalarioBruto } = this.props;
        
        onChangeSalarioBruto(value);
    }

    handleKeyUpSalarioBruto = (event) => {        
        const value = Number.parseInt(event.target.value, 10);
        if (event.key === 'ArrowUp') {                        
            this.setValueInput(value+1);
        }else if (event.key === 'ArrowDown'){            
            if((value - 1) >= 1000)
                this.setValueInput(value - 1);
        }
    }
    render() {
        const { salarioBruto } = this.props;

        return (
            <div className="col s12">
                <label>Salário Bruto</label>
                <input type="text" value={salarioBruto} onChange={this.handleChangeSalarioBruto} onKeyUp={this.handleKeyUpSalarioBruto} />
            </div>
        )
    }
}
