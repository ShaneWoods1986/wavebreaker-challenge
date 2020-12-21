import React from 'react';
import List from './components/list/list';
import View from './components/view/view';

const routes = [
    {
        id: 1,
        path: "/list",
        exact: true,
        header: () => <div>List header</div>,
        main: List
    }, {
        id: 2,
        path: "/view/:id",
        exact: true,
        text: "View",
        indirect: true,
        header: () => <div>View sidebar!</div>,
        main: View
    }
];

export default routes;