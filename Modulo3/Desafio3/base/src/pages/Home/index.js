import React, { useState } from 'react'

import Header from './components/Header'
import InputField from './components/InputField'
import Installments from './components/Installments'

import { Container, Main } from './styles'

export default function Dashboard() {
  const [amount, setAmount] = useState('')
  const [tax, setTax] = useState('')
  const [period, setPeriod] = useState('')
  const [proffit, setProffit] = useState(true)

  function handleChangeAmount(event) {
    setAmount(event.target.value)
  }

  function handleChangeTax(event) {
    setTax(event.target.value)
    setProffit(event.target.value > '0')
  }

  function handleChangePeriod(event) {
    setPeriod(event.target.value)
  }

  return (
    <Container>
      <Header />
      <Main>
        <InputField
          name="amount"
          value={amount}
          changeHandle={handleChangeAmount}
          placeholder="Ammount"
          max="100000"
        />
        <InputField
          name="tax"
          value={tax}
          changeHandle={handleChangeTax}
          placeholder="Tax"
          step="0.01"
          min="-12.00"
          max="12.00"
        />
        <InputField
          name="period"
          value={period}
          changeHandle={handleChangePeriod}
          placeholder="Period"
        />
      </Main>
      <Installments
        amount={amount}
        tax={tax}
        period={period}
        proffit={proffit}
      />
    </Container>
  )
}
