import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './header.scss';
import routes from '../../routes';

class Header extends Component {
    constructor({history}) {
        super();
        this.state = {
            history,
            dropdownVisible: false
        };
    }

    renderLinks() {
        return routes.filter(route => !route.indirect).map(route => {
            return <Link key={route.id} to={route.path}><button type="button" className={route.className}>{route.text}</button></Link>;
        });
    }

    render() {
        return (
            <div className="top-bar">
                <div className="group">
                    <h3>Wavebreak Challenge</h3>
                    <div className="button-group" role="group">
                        {this.renderLinks()}
                    </div>
                </div>
            </div>
            )
        }
    }
    export default Header;