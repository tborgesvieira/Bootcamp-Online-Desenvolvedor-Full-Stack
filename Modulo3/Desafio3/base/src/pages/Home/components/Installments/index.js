import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Container } from './styles'

import formatNumber from '../../../../utils/formatNumber'
import formatTax from '../../../../utils/formatTax'

export default function Installments({ amount, tax, period, proffit }) {
  const [installments, setInstallments] = useState([])

  useEffect(() => {
    if (amount && tax && period) {
      const calculateInstallments = []

      for (let index = 1; index <= period; index += 1) {
        const installmentNumber = index
        const finalAmmount = amount * (1 + tax / 100) ** index
        const installmentAmmount = amount * (1 + tax / 100) ** index - amount
        const installmentTax = (1 + tax / 100) ** index - 1

        calculateInstallments.push({
          installmentNumber,
          finalAmmount,
          installmentAmmount,
          installmentTax,
        })
      }
      setInstallments(calculateInstallments)
    }
  }, [amount, period, tax])

  return (
    <Container proffit={proffit}>
      <ul>
        {' '}
        {installments.length > 0 &&
          installments.map(installment => {
            return (
              <li key={installment.installmentNumber}>
                <strong>{installment.installmentNumber}</strong>
                <div>
                  <p>{formatNumber(installment.finalAmmount)}</p>
                  <p>{formatNumber(installment.installmentAmmount)}</p>
                  <p>{formatTax(installment.installmentTax)}</p>
                </div>
              </li>
            )
          })}
      </ul>
    </Container>
  )
}

Installments.propTypes = {
  amount: PropTypes.string.isRequired,
  tax: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  proffit: PropTypes.bool.isRequired,
}
