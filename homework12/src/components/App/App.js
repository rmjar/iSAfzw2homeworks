import React, { Component, Fragment } from 'react';
import { Route, Router } from "react-router";
import createBrowserHistory from 'history/createBrowserHistory';

import AppBar from '../AppBar'
import RecipesList from '../RecipesList';
import Recipe from '../Recipe';

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
    const { isUser, userUID } = this.state;

    return (
      <div>
        <Router history={history}>
          <Fragment>
            <Route path='/' render={props => <AppBar handleClick={this.handleSignInClick} {...props} />} />
            {
              !isUser ? <Route path='/' render={() => <div>Zaloguj się</div>} /> : <Route path="/" render={() => <div>Zalogowany</div>} />
            }
            <Route exact path='/' render={props => <RecipesList isUser={isUser} userUID={userUID} {...props} />} />
            <Route path='/recipe/id?' render={props => <Recipe isUser={isUser} userUID={userUID} {...props} />} />
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
