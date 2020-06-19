import React, { Component } from 'react'

export default class DecrementButton extends Component {
    handleButtonClick = () => {
        this.props.onIncrement('-');
    }
    
    render() {
        return (
            <button 
                onClick = { this.handleButtonClick }
                className="waves-effect waves-light btn red darken-4">-</button>
        )
    }
}
