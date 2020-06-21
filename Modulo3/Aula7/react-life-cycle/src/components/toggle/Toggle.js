import React, { Component } from 'react'

export default class Toggle extends Component {

    handleChange = (event) =>{        
        const { onToggle } = this.props;

        const isChecked = event.target.checked;

        onToggle(isChecked);
    }

    render() {
        const { enabled, description } = this.props;

        const style = {
            label:{
              fontSize: '14px',
              fontWeight: 'bold'
            }
        }

        return (
            <div className="switch">
                <label style={style.label}>
                    {description}
                    <input type="checkbox" checked={enabled} onChange={this.handleChange} />
                    <span className="lever"></span>
                </label>
            </div>
        )
    }
}
