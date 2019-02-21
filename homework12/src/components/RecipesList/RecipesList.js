import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { firestore } from '../../firebase/fbConfig';
import moment from 'moment';

class RecipesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
        }
    }

    unsubscribeFromFirestore = null;

    getRecipes = () => {
        const dbRef = firestore.collection("recipes");
        if (this.props.searchText) {
            this.unsubscribeFromFirestore = dbRef
                .onSnapshot(snapshot => {
                    const recipes = snapshot.docs.map(
                        doc => ({ id: doc.id, ...doc.data() }))
                        .filter(recipe => recipe.name.toLowerCase().includes(this.props.searchText.toLowerCase()));
                    this.setState({ recipes });
                });
        } else {
            this.unsubscribeFromFirestore = dbRef
                .orderBy("addedOn", "desc")
                .limit(10)
                .onSnapshot(snapshot => {
                    const recipes = snapshot.docs.map(
                        doc => ({ id: doc.id, ...doc.data() })

                    );
                    this.setState({ recipes });
                });
        }
    }

    componentDidMount = () => {
        this.getRecipes()
    };

    componentDidUpdate = (prevProps) => {
        if (this.props.searchText !== prevProps.searchText) {
            this.getRecipes();
        }
    }

    componentWillUnmount = () => {
        this.unsubscribeFromFirestore();
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.searchText !== prevState.searchText) {
            return { searchText: nextProps.searchText };
        }
        else return null;
    }

    handleClick = (e) => {
        e.preventDefault();
        this.props.history.push('/addrecipe');
    }


    render() {
        const { isUser, userUID, userName } = this.props;
        const { recipes = null } = this.state;
        return (
            <div>
                {recipes && <ul>
                    {recipes.map(recipe =>
                        <li style={{ "listStyleType": "none" }} key={recipe.id}>
                            <Link key={recipe.id} to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
                            <div>{recipe.recipe}</div>
                            <div>Added: {moment(recipe.addedOn.toDate().toString()).calendar()}, by: {recipe.userName}</div>
                        </li>)}
                </ul>}
                {isUser && <button type='button' onClick={this.handleClick}>Add</button>}
            </div>
        )
    }
}

export default withRouter(RecipesList);