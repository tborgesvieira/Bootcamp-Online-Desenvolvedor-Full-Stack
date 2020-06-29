import React from 'react'
import PropTypes from 'prop-types'

import { InputContainer } from './styles'

export default function InputField({
  name,
  value,
  changeHandle,
  placeholder,
  step,
  min,
  max,
}) {
  return (
    <InputContainer
      type="number"
      name={name}
      value={value}
      onChange={changeHandle}
      placeholder={placeholder}
      step={step}
      min={min}
      max={max}
    />
  )
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  changeHandle: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  step: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
}

InputField.defaultProps = {
  step: '1',
  min: '0',
  max: '100000000000',
}
