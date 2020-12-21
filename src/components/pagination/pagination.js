import React, { Component } from 'react';
import './pagination.scss';

class Pagination extends Component {
    renderPageItems() {
        const pageNum = (this.props.total / 20) + 1;
        if (pageNum < 2) {
            return;
        }
        const pages = [];
        for (let i = 1; i <= pageNum; i++) {
            pages.push(i);
        }
        return pages.map((page) => this.renderPageItem(page));
    }

    renderPageItem(i) {
        let cssClass = "pageItem";
        if (i === this.props.activePage) {
            cssClass = cssClass + " active";
        }
        return <div key={`pageItem${i}`} className={cssClass} onClick={() => this.changePage(i)}>{i}</div>
    }

    changePage(page) {
        const num = (page - 1) * 20;
        this.props.pageChanged({num, activePage: page});
    }

    render() {
        return <div className="pagination">
            {this.renderPageItems()}
        </div>
    }
}
export default Pagination;