import React, { Component } from 'react';
import SalarioBruto from './components/salariobruto/SalarioBruto';
import Descontos from './components/descontos/Descontos';
import SalarioLiquido from './components/salarioliquido/SalarioLiquido';

const COLOR_INSS = '#e67e22';
const COLOR_IRRF = '#c0392b';
const COLOR_LIQUIDO = '#16a085';

export default class App extends Component {
  constructor(){
    super();

    this.state = {
      salarioBruto: 1000,
      salarioLiquido: 0
    }
  }

  handleChangeSalario = (salario) =>{
    this.setState({salarioBruto: salario});
  }

  onValorLiquido = (valor) => {
    if(this.state.salarioLiquido !== valor)
      this.setState({salarioLiquido: valor});
  }
  
  render() {
    const { salarioBruto, salarioLiquido } = this.state;
    return (
      <div className="container">
        <h1 style={styles.centeredTitle}>React Salário</h1>

        <SalarioBruto salarioBruto={salarioBruto} onChangeSalarioBruto={this.handleChangeSalario} />
        <Descontos salarioBruto={salarioBruto} colorIrrf={COLOR_IRRF} colorInss={COLOR_INSS} onChangeSalario={this.onValorLiquido} />
        <SalarioLiquido salarioLiquido={salarioLiquido} colorLiquido={COLOR_LIQUIDO} />
      </div>
    );
  }
}
const styles = {
  centeredTitle: {
    textAlign: 'center'
  }
}