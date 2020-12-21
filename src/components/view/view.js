import React, { Component } from 'react';

class View extends Component {
    constructor(props) {
        super(props);

        this.state = { id: 0};
    }

    async componentDidMount() {
        this.setState({id: this.props.match.params.id});
    }

    render() {
        return (
            <div>

            <h1>View Page</h1>
            <div>{this.props.match.params.id}</div>
            <div>{this.state.id}</div>

            </div>
            );
        }

    }



export default View;