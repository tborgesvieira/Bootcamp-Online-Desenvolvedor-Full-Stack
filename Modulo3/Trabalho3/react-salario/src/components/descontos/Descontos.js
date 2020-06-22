import React, { Component } from 'react'

import { formatMoney } from '../../helpers/formatters';

import ReadOnly from '../readonly/ReadOnly';

export default class Descontos extends Component {
    constructor() {
        super();

        this.state = {
            descontoInssText: '',
            descontoInss: 0,
            percentualInss: 0,
            baseIrrf: 0,
            descontoIrrf: 0,
            salarioLiquido: 0
        }
    }

    componentDidMount = () => {
        this.calculaDescontos();
        this.calculaIrrf();
        this.onChangeSalario();
    }

    componentDidUpdate = () => {
        this.calculaDescontos();
        this.calculaIrrf();
        this.onChangeSalario();
    }

    onChangeSalario = () => {
        const { onChangeSalario, salarioBruto } = this.props;

        const { descontoInss, descontoIrrf, salarioLiquido } = this.state;

        const liquido = salarioBruto - descontoInss - descontoIrrf;

        if(salarioLiquido !== liquido)
            onChangeSalario(liquido);
    }

    calculaIrrf = () => {
        const { baseIrrf, descontoIrrf } = this.state;

        let descIrrf = 0;
        let deducaoIrrf = 0;

        switch (true) {
            case (baseIrrf <= 1903.98):
                descIrrf = 0;
                deducaoIrrf = 0;
                break;
            case (baseIrrf <= 2826.65):
                descIrrf = 7.5;
                deducaoIrrf = 142.80;
                break;
            case (baseIrrf <= 3751.05):
                descIrrf = 15;
                deducaoIrrf = 354.80;
                break;
            case (baseIrrf <= 4664.68):
                descIrrf = 22.5;
                deducaoIrrf = 636.13;
                break;
            case (baseIrrf > 4664.68):
                descIrrf = 27.5;
                deducaoIrrf = 869.36;
                break;
        }

        let desconto = 0;

        if (descIrrf > 0) {
            desconto = baseIrrf * (descIrrf / 100);
            desconto = desconto - deducaoIrrf;
        }

        if (descontoIrrf !== desconto) {
            this.setState({ descontoIrrf: desconto });
        }
    }

    calculaDescontos = () => {
        const { salarioBruto } = this.props;

        const { descontoInssText } = this.state;

        let percentual = 0;
        let desconto = 713.10;

        switch (true) {
            case salarioBruto <= 1045:
                percentual = 7.5;
                desconto = (salarioBruto) * (percentual / 100);
                break;
            case salarioBruto <= 2089.60:
                percentual = 9;
                const desconto_9_1 = (1045) * (7.5 / 100);
                desconto = ((salarioBruto - 1045) * (percentual / 100)) + desconto_9_1;
                break;
            case salarioBruto <= 3134.40:
                percentual = 12;
                const desconto_12_1 = 1045 * (7.5 / 100);
                const desconto_12_2 = 1044.60 * (9 / 100);
                desconto = ((salarioBruto - 2089.60) * (percentual / 100));
                desconto = desconto + desconto_12_1 + desconto_12_2;
                break;
            case salarioBruto <= 6101.06:
                percentual = 14;
                const desconto_14_1 = 1045 * (7.5 / 100);
                const desconto_14_2 = 1044.60 * (9 / 100);
                const desconto_14_3 = 1044.80 * (12 / 100);
                desconto = ((salarioBruto - 3134.40) * (percentual / 100));
                desconto = desconto + desconto_14_1 + desconto_14_2 + desconto_14_3;
                break;
        }

        const desc = this.formataSalario(desconto, percentual);

        if (descontoInssText !== desc) {
            this.setState({
                descontoInssText: desc,
                percentualInss: percentual,
                descontoInss: desconto,
                baseIrrf: salarioBruto - desconto
            });
        }
    }

    formataSalario = (salario, desconto) => {

        if (desconto === 0) {
            return `${formatMoney(salario)} (Teto)`;
        } else {
            return `${formatMoney(salario)} (${desconto.toFixed(2)}%)`;
        }
    }

    render() {
        const { salarioBruto, colorIrrf, colorInss } = this.props;

        const { descontoInssText, baseIrrf, descontoIrrf } = this.state;

        return (
            <div className="col s12">
                <div className="row">
                    <div className="col s3">                        
                        <ReadOnly value={salarioBruto}>Base INSS</ReadOnly>
                    </div>
                    <div className="col s3">
                        <ReadOnly value={descontoInssText} color={colorInss}>Desconto INSS</ReadOnly>
                    </div>
                    <div className="col s3">
                        <ReadOnly value={baseIrrf}>Base IRRF</ReadOnly>                        
                    </div>
                    <div className="col s3">
                        <ReadOnly value={descontoIrrf} color={colorIrrf}>Desconto IRRF</ReadOnly>                       
                    </div>
                </div>
            </div>
        )
    }
}
