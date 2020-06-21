import React, { Component } from 'react'
import { formatMoney } from '../../helpers/formatters';

export default class SalarioLiquido extends Component {
    render() {
        const { salarioLiquido, colorLiquido } = this.props;
        return (
            <div className="col s12">
                <div className="row">
                    <div className="col s3">
                        <label>Salário Líquido</label>
                        <input
                            type="text"
                            value={formatMoney(salarioLiquido)}
                            style={
                                {
                                    fontWeight: 'bold',
                                    color: colorLiquido
                                }
                            }
                            readOnly />
                    </div>
                </div>
            </div>
        )
    }
}
