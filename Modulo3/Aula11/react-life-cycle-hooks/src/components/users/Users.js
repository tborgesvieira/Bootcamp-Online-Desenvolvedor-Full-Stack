import React, { useState, useEffect } from 'react'
import User from './User';

export default function Users({ users }) {
    const [secondsVisible, setSecondsVisible] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsVisible(secondsVisible + 1);
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [secondsVisible])

    return (
        <div>
            <p>Componente Users visível por {secondsVisible} segundos</p>
            {
                users.map(user => {
                    const { login } = user;
                    return (<div key={login.uuid}><User user={user} /></div>)
                })}
        </div>
    )
}

