import React, { Component } from 'react';

import imageDataService from '../../data-services/img.service';

class View extends Component {
    constructor(props) {
        super(props);

        this.state = { image: {}};
    }

    async componentDidMount() {
        const image = await imageDataService.getImage(this.props.match.params.id);
        this.setState({image});
    }

    renderImage() {
        return <img alt={this.state.image.tags} src={this.state.image.url}></img>
    }

    render() {
        return (
            <div className="view-page">
                <h1>View Page</h1>
                {this.renderImage()}
                <div>Name: {this.state.image.user}</div>
                <div>Tags: {this.state.image.tags}</div>
                <div>Views: {this.state.image.views}</div>
                <div>Downloads: {this.state.image.downloads}</div>
                <div>Size: {this.state.image.size}</div>
            </div>
            );
        }

    }



export default View;