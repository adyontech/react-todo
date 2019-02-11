import React, { Component } from 'react';
import {
  Route,
  Switch
} from "react-router-dom";
import BoardMain from "./components/boards/boardsMain";
import ViewBoard from './components/boards/viewBoard/viewBoard';
import NotFound from "./components/notFound";
import Header from "./components/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
          <Switch>
          <Route exact path = "/"
            component = {
              BoardMain
            }/>
            <Route path="/view/:boardId" component={ViewBoard}/>
            <Route component = {
              NotFound
            }
        /> 
        </Switch>
      </div>
    );
  }
}

export default App;
