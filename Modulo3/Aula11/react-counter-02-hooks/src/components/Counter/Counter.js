import React, { useState } from 'react';

import css from './counter.module.css';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import Value from './Value';
import Steps from './Steps';

export default function Counter() {
  const [currentCounter, setCurrentCounter] = useState(2);
  const [steps, setSteps] = useState(0);

  const handleButtonClick = (clickType) => {    
    setCurrentCounter(clickType === '+' ? currentCounter + 1 : currentCounter - 1);
    setSteps(steps + 1);    
  };

  return (
    <div className={css.counterContainer}>
      <DecrementButton onDecrement={handleButtonClick} />
      <Value value={currentCounter} />
      <IncrementButton onIncrement={handleButtonClick} />
      <Steps currentStep={steps} />
    </div>
  );
}

