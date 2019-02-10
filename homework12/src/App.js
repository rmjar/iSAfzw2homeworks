import React, { Component } from 'react';
import { auth } from './firebase/fbConfig';
import { Route, Router } from "react-router";
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();
const provider = new auth.GoogleAuthProvider();


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isUser: false,
      userUID: ''
    }
  }

  signOut = () => {
    auth().signOut().then((data) => {
      this.setState({ isUser: false, userUID: '' });
    });
  };

  signInWithGoogle = () => {
    auth().signInWithPopup(provider);
  }


  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.setState({ isUser: true, userUID: user.uid })
      } else {
        console.log('user logged out')
      }
    })
  }

  render() {
    const { isUser } = this.state;

    return (
      <div className="App">
        {!isUser && <button type="button" onClick={this.signInWithGoogle}>Sign in</button>}
        {isUser && <button type="button" onClick={this.signOut}>Sign out</button>}
        <Router history={history}>
          {
            !isUser ? <Route path="/" render={() => <div> zaloguj się </div>} /> : <Route path="/" render={() => <div>Zalogowany</div>} />
          }


        </Router>
      </div>
    );
  }
}

export default App;
