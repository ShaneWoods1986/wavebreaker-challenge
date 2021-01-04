import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './list.scss';
import Pagination from '../pagination/pagination';
import imageDataService from '../../data-services/img.service';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoSize: 2,
            entriesDisplayed: 30,
            totalItems: 0,
            displayedItems: [],
            activePage: 1
        };
    }

    async componentDidMount() {
        const response = await imageDataService.getImages(this.state.entriesDisplayed, this.state.activePage);
        this.setState({...this.state, totalItems: response.total, displayedItems: response.images});
    }

    renderItem(item) {
        const style = {
            width: item.previewWidth * this.state.photoSize,
            height: item.previewHeight * this.state.photoSize
        };
        return <Link key={`img${item.id}`} className="item" to={`/view/${item.id}`}>
            <img style={style} alt={item.tags} srcSet={item.previewSrcSet} src={item.url}></img>
        </Link>

    }

    renderItems() {
        return this.state.displayedItems.map((item) => {
            return this.renderItem(item);
        });
    }

    renderPhotoSizeButtons() {
        return <div className="radio-group">
            {this.renderPhotoSizeButton(1, "Small")}
            {this.renderPhotoSizeButton(2, "Medium")}
            {this.renderPhotoSizeButton(3, "Large")}
            {this.renderPhotoSizeButton(4, "Larger")}
        </div>
    }

    renderPhotoSizeButton(idx, lbl) {
        let clsName = "btn";
        if (this.state.photoSize === idx) {
            clsName = clsName + " active"
        }
        return <label className={clsName} onClick={() => this.switchPhotoSize(idx)}>{lbl}</label>
    }

    switchPhotoSize(size) {
        this.setState({...this.state, photoSize: size});
    }

    async pageChanged({activePage}) {
        const response = await imageDataService.getImages(this.state.entriesDisplayed, activePage);
        this.setState({...this.state, activePage, totalItems: response.total, displayedItems: response.images});
    }

    render() {
        return (
            <div className="list-page">
                <h1>List Page</h1>

                {this.renderPhotoSizeButtons()}

                <div className="parent">
                    {this.renderItems()}
                </div>
                <Pagination total={this.state.totalItems} entriesDisplayed={this.state.entriesDisplayed} activePage={this.state.activePage} pageChanged={(i) => this.pageChanged(i)}/>

            </div>
            );
        }

    }

export default List;