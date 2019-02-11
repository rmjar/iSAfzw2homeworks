import React, { Component } from 'react';
import { Route, Router } from "react-router";
import createBrowserHistory from 'history/createBrowserHistory';

import AppBar from '../AppBar'
import RecipesList from '../RecipesList';

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUser: false,
      userUID: ''
    }
  }


  handleSignInClick = (params) => {
    console.log(params)
    this.setState({
      isUser: params.isUser,
      userUID: params.userUID
    })
  }

  render() {
    const { isUser } = this.state;

    return (
      <div className="App">
        <AppBar handleClick={this.handleSignInClick} />

        <Router history={history}>
          {
            !isUser ? <Route path="/" render={() => <div>Zaloguj się</div>} /> : <Route path="/" render={() => <div>Zalogowany</div>} />
          }
        </Router>

        <RecipesList isUser={isUser} />
      </div>
    );
  }
}

export default App;
