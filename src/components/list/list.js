import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './list.scss';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = { };
    }

    render() {
        return (
            <div>
            <h1>List Page</h1>

            <Link to={"/view/1"}>
                <button type="button" className="btn">View</button>
            </Link>

            </div>
            );
        }

    }



export default List;