import React, {Component} from 'react';
import './App.css';
import Home from './Home';
import Citydetail from "./Citydetail";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const APIKey = '2dda12e6d704307fe7e3657c6de17a4d';

class App extends Component {
 
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/city/:id" component={Citydetail} />
        </Switch>
      </Router>
    );
  }
}

export default App;
