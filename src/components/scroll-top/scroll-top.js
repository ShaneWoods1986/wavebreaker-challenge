import React, { Component } from "react";
import "./scroll-top.scss";

class ScrollToTop extends Component {
    constructor() {
        super();
        this.state = {
            buttonVisible: false
        };
        window.onscroll = () => { this.scrollFunction(); };
    }

    scrollToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    scrollFunction() {
        const buttonVisible = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20);
        if (buttonVisible !== this.state.buttonVisible) {
            this.setState({ buttonVisible });
        }
      }

    render() {
        if (!this.state.buttonVisible) {
            return <div></div>;
        }
        return (
            <div className="scroll-to-top" onClick={() => this.scrollToTop()}>
            </div>
        );
    }
}
    export default ScrollToTop;