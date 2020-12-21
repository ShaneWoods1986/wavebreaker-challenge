import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './list.scss';
import Pagination from '../pagination/pagination';
import testData from '../../testData.json';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalItems: testData.length,
            displayedItems: testData.slice(0, 20),
            activePage: 1
        };
    }

    renderItem(itemProperties) {
        const style = {
            width: itemProperties.width,
            height: itemProperties.height
        };
        return <Link className="item" to={`/view/${itemProperties.id}`}>
        <div  style={style}>
        </div>
        </Link>

    }

    renderItems() {
        return this.state.displayedItems.map((item) => {
            return this.renderItem(item);
        });
    }

    pageChanged({num, activePage}) {
        console.log("#########num", num);
        this.setState({...this.state, displayedItems: testData.slice(num, num + 20), activePage});
    }

    render() {
        return (
            <div className="list-page">
                <h1>List Page</h1>

                <div className="parent">
                    {this.renderItems()}
                </div>
                <Pagination total={this.state.totalItems} activePage={this.state.activePage} pageChanged={(i) => this.pageChanged(i)}/>

            </div>
            );
        }

    }

export default List;