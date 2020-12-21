import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import routes from './routes';
import List from './components/list/list';
// import View from './components/view/view';

function App() {
  return (
    <Router>
    <div className="App">
    <Switch>
    {routes.map((route, index) => (
      <Route
      key={index}
      path={route.path}
      exact={route.exact}
      component={route.main}
      />
      ))}
    {/* <Route exact path="/list" component={List}/>
    <Route exact path="/view/:id" component={View}/> */}
      <Route exact path="/" component={List}/>
      <Route path="*" component={List}/>
      </Switch>
      </div>
      </Router>
      );
    }

    export default App;
