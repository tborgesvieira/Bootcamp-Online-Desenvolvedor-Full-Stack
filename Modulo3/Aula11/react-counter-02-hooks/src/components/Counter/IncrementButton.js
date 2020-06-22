import React from 'react';

export default function IncrementButton(props) {
  const { onIncrement } = props;

  const handleButtonClick = () => {
    onIncrement('+');
  };

  return (
    <button
      onClick={handleButtonClick}
      className="waves-effect waves-light btn green darken-4"
    >
      +
    </button>
  );
}
