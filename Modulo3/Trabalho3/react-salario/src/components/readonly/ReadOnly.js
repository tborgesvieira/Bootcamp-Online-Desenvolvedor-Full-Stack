import React, { Component } from 'react'

import { formatMoney } from '../../helpers/formatters';

export default class ReadOnly extends Component {
    render() {
        const { color, value } = this.props;

        const label = this.props.children || 'Label'

        const valor = isNaN(value) ? value : formatMoney(value);

        return (
            <>
                <label>{label}</label>
                <input
                    style={
                        {
                            fontWeight: 'bold',
                            color: color || '#000'
                        }
                    }
                    type="text"
                    value={valor} readOnly />
            </>
        )
    }
}
