import React, { Component } from "react";

import "./view.scss";
import imageDataService from "../../data-services/img.service";

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
        return (<img alt={this.state.image.tags} srcSet={this.state.image.srcSet} src={this.state.image.url}></img>);
    }

    renderImageData() {
        return <div className="img-data">
        <div className="row">
            <strong>Photographer</strong>
            <span>{this.state.image.user}</span>
        </div>
        <div className="row">
            <strong>Tags</strong>
            <span>{this.state.image.tags}</span>
        </div>
        <div className="row">
            <strong>Views</strong>
            <span>{this.state.image.views}</span>
        </div>
        <div className="row">
            <strong>Downloads</strong>
            <span>{this.state.image.downloads}</span>
        </div>
        <div className="row">
            <strong>Size</strong>
            <span>{this.state.image.size}</span>
        </div>
    </div>;
    }

    render() {
        return (
            <div className="view-page">
                <div className="container">
                    {this.renderImage()}
                    {this.renderImageData()}
                </div>
            </div>
            );
        }

    }

export default View;