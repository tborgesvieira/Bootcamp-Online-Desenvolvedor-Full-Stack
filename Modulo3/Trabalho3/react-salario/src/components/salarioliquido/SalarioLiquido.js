import React, { Component } from 'react'
import { formatMoney } from '../../helpers/formatters';
import ReadOnly from '../readonly/ReadOnly';

export default class SalarioLiquido extends Component {
    render() {
        const { salarioLiquido, colorLiquido } = this.props;
        return (
            <div className="col s12">
                <div className="row">
                    <div className="col s3">
                        <ReadOnly value={salarioLiquido} color={colorLiquido}>Salário Líquido</ReadOnly>                        
                    </div>
                </div>
            </div>
        )
    }
}
