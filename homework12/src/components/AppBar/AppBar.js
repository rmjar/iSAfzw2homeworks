import React, { Component } from 'react';
import { auth } from '../../firebase/fbConfig';

const provider = new auth.GoogleAuthProvider();


class AppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickHandler: props.handleClick,
            filterHandler: props.handleFilter,
            isUser: false,
            userUID: '',
            userName:'',
            searchText: '',
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
                this.setState({ isUser: true, userUID: user.uid, userName: user.displayName })
                this.state.clickHandler({ isUser: this.state.isUser, userUID: this.state.userUID, userName: this.state.userName });
            } else {
                this.state.clickHandler({ isUser: this.state.isUser, userUID: this.state.userUID, userName: this.state.userName });
            }
        })
    }

    componentWillUnmount = () => {
        if (this.unsubscribeAuth) {
            this.unsubscribeAuth();
            this.unsubscribeAuth = null;
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        this.state.filterHandler(this.state.searchText);
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value,
        });
    }

    render() {
        const { isUser, searchText, userName } = this.state;
        return (
            <div>
                <form style={{ display: 'inline-block' }}>
                    <input type='text' name='searchText' value={searchText} onChange={this.handleChange} />
                    <button type='button' onClick={this.handleClick}> Search </button>
                </form>
                {!isUser && <button type="button" onClick={this.signInWithGoogle}>Sign in</button>}
                {isUser &&
                    <span>
                         Użytkownik: {userName} 
                        <button type="button" onClick={this.signOut}>Sign out</button>
                </span>}
            </div >
            )
        }
    }
    
export default AppBar;