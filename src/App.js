import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Navigation from "./components/layouts/NavigationCustoms";
import routes from "./Routes/index";
import DrawerCutoms from './components/DrawerCutoms'

class App extends Component {
  ShowContet = routes => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  };

  render() {
    return (
      <Router>
        <div className="App">
            {this.ShowContet(routes)}
        </div>
      </Router>
    );
  }
}

export default App;
