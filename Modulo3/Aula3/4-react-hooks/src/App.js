import React, { useState, useEffect } from 'react';
import { getNewTimesTamp } from './helpers/dateTimeHelpers';

export default function App() {

  const [clickArray, setClickArray] = useState([]);

  useEffect (() =>{
    document.title = clickArray.length;
  });

  const handleClick = () => {
    const newClickArray = Object.assign([], clickArray);

    newClickArray.push(getNewTimesTamp());

    setClickArray(newClickArray);    
  }

  return(
    <div>
        <h1>
          React e <em>Hooks</em>
        </h1>

        <button onClick={handleClick}>Clique aqui</button>

        <ul>{clickArray.map((item)=>{
          return <li key={item}>{item}</li>;
        })}</ul>
      </div>
  );  
}
