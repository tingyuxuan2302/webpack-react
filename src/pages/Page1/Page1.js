import React, {Component} from 'react';

import './Page1.css';

import img from './images/th.jpg';

export default class Page1 extends Component {
    render() {
        return (
            <div className="page-box">
            	<span className="text">
            		this is Page1~hot
                	袁宇大萨比aa哼哈嘿heheddda
            	</span>
                
                <img className="image" src={ img } />
            </div>
        )
    }
}