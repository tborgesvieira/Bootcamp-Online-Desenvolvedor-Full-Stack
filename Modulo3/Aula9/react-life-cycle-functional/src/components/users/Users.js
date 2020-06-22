import React, { Component } from 'react'
import User from './User';

export default class Users extends Component {

    constructor(){
        super();
        this.state = {
            secondsVisible:0
        };

        this.interval = null;
    }

    componentDidMount(){
        console.log('componentDidMount de Users');
                
        this.interval = setInterval(() =>{
            const { secondsVisible } = this.state;
            this.setState({
                secondsVisible: secondsVisible + 1,
            })
        }, 1000);
    }

    componentDidUpdate(){
        console.log('componentDidUpdate de Users');
    }

    componentWillUnmount(){
        console.log('componentWillUnmount de Users');

        clearInterval(this.interval);
    }

    render() {
        const { users } = this.props;
        const { secondsVisible } = this.state;
        return (
            <div>                                
                <p>Componente Users visível por {secondsVisible} segundos</p>                
                {   
                    users.map(user =>{                        
                        const { login } = user;
                        return (<div key={login.uuid}><User user={user}/></div>)
                })}
            </div>
        )
    }
}
