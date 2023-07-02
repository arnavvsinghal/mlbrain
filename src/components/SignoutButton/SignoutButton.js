import React, { Component } from 'react'
import './signoutbutton.css'
export default class Main extends Component {
    render() {
        const {routeChange} = this.props;
        return (
            <div className="mainContent">
                <div className='signOutButton'>
                    <button onClick={()=>routeChange('signin')}>Sign Out</button>
                </div>
            </div>
        )
    }
}
