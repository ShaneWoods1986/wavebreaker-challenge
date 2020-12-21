import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import routes from './routes';
import List from './components/list/list';

function App() {
  return (
    <Router>
      <div className="App">

        <header>
          <Switch>
            {routes.map((route, index) => (
              <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.header}
              />
              ))}
            <Route exact path="*" component={() => <div></div>}/>
          </Switch>
        </header>

        <Switch>
          {routes.map((route, index) => (
            <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
            />
            ))}
            <Route exact path="/" component={List}/>
            <Route path="*" component={List}/>
          </Switch>
        </div>
      </Router>
      );
    }

    export default App;
