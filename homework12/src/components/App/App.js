import React, { Component, Fragment } from 'react';
import { Route, Router } from "react-router";
import createBrowserHistory from 'history/createBrowserHistory';

import AppBar from '../AppBar'
import RecipesList from '../RecipesList';
import Recipe from '../Recipe';
import AddNewRecipe from '../Recipe/AddNewRecipe';

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUser: false,
      userUID: '',
      userName: '',
      searchText: '',
    }
  }

  handleSignInClick = (params) => {
    this.setState(prevState => {
      return {
        isUser: params.isUser,
        userUID: params.userUID,
        userName: params.userName,
      }
    })
  }

  handleFilter = (searchText) => {
    this.setState(prevState => {
      return {
        searchText
      }
    })
  }

  render() {
    const { isUser, userUID, userName, searchText } = this.state;
    return (
      <div>
        <Router history={history}>
          <Fragment>
            <Route path='/'
              render={props => <AppBar
                handleFilter={this.handleFilter}
                handleClick={this.handleSignInClick}
                {...props} />} />

            <Route exact path='/'
              render={props => <RecipesList
                isUser={isUser}
                userUID={userUID}
                userName={userName}
                searchText={searchText}
                {...props} />} />

            <Route path='/recipe/:id?'
              render={props => <Recipe
                isUser={isUser}
                userUID={userUID}
                userName={userName}
                {...props} />} />

            <Route path='/addrecipe'
              render={props => <AddNewRecipe
                isUser={isUser}
                userUID={userUID}
                userName={userName}
                {...props} />} />

          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
