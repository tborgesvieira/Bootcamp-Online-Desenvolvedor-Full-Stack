import React from 'react'
import { formatNumber } from '../../helpers/formatHelpers';

import css from './header.module.css';

export default function Header({ onChangeFilter, filter, countryCount, totalPopulation }) {

    const handleInputChange = (event) => {
        onChangeFilter(event.target.value);
    }

    return (
        <div className={css.flexRow}>
            <input
                className={css.inputForm}
                type="text"
                value={filter}
                onChange={handleInputChange}
                placeholder='Filtro' /> {' '}
                |
            <span className={css.countries}>
                Países: <strong>{countryCount}</strong>
            </span>{' '}
                |
            <span className={css.population}>
                População: <strong> {formatNumber(totalPopulation)} </strong>
            </span>{' '}
        </div>
    )
}
