import React, { Component } from 'react'
import './main.css'
export default class Main extends Component {
    render() {
        return (
            <div className="mainContent">
                <div className='signOutButton'>
                    <button>Sign Out</button>
                </div>
            <div className='link'>
                <div className='search'>
                <input type='text'/>
                <button>Detect</button>
                </div>
            </div>
            </div>
        )
    }
}
