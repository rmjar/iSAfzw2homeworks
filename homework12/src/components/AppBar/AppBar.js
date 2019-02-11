import React, { Component } from 'react';
import { auth } from '../../firebase/fbConfig';

const provider = new auth.GoogleAuthProvider();


class AppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickHandler: props.handleClick,
            isUser: false,
            userUID: ''
        }
    }

    signOut = () => {
        auth().signOut().then(() => {
            this.setState({ isUser: false, userUID: '' });
        });
    };

    signInWithGoogle = () => {
        auth().signInWithPopup(provider);
    }

    unsubscribeAuth = null;

    componentDidMount() {
        this.unsubscribeAuth = auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ isUser: true, userUID: user.uid })
                this.state.clickHandler({ isUser: this.state.isUser, userUID: this.state.userUID });
            } else {
                this.state.clickHandler({ isUser: this.state.isUser, userUID: this.state.userUID });
            }
        })
    }

    componentWillUnmount = () => {
        if (this.unsubscribeAuth) {
            this.unsubscribeAuth();
            this.unsubscribeAuth = null;
        }
    }

    render() {
        const { isUser } = this.state;
        return (
            <div>
                {!isUser && <button type="button" onClick={this.signInWithGoogle}>Sign in</button>}
                {isUser && <button type="button" onClick={this.signOut}>Sign out</button>}
            </div>
        )
    }
}

export default AppBar;