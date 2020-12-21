import React from 'react';
import List from './components/list/list';
import View from './components/view/view';
import Header from './components/header/header';

const routes = [
    {
        id: 1,
        path: "/list",
        exact: true,
        text: 'List',
        className: "btn btn-primary",
        header: () => <div></div>,
        main: List
    }, {
        id: 2,
        path: "/view/:id",
        exact: true,
        text: "View",
        indirect: true,
        header: Header,
        main: View
    }
];

export default routes;