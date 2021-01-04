import List from './components/list/list';
import View from './components/view/view';
import Header from './components/header/header';

const routes = [
    {
        id: 1,
        path: "/list",
        exact: true,
        text: "Home",
        className: "btn btn-primary",
        header: Header,
        title: "List Page",
        main: List
    }, {
        id: 2,
        path: "/view/:id",
        exact: true,
        text: "View",
        indirect: true,
        header: Header,
        title: "View Page",
        main: View
    }
];

export default routes;