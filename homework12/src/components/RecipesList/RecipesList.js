import React, { Component } from 'react';

import { firestore } from '../../firebase/fbConfig';
import moment from 'moment';

class RecipesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: props.isUser,
            userUID: props.userUID,
        }
    }

    unsubscribeFromFirestore = null;

    getRecipes = () => {
        const dbRef = firestore.collection("recipes");
        if (this.state.isUser) {
            this.unsubscribeFromFirestore = dbRef
                .onSnapshot(snapshot => {
                    const recipes = snapshot.docs.map(
                        doc => ({ id: doc.id, ...doc.data() })

                    );
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

    componentWillUnmount = () => {
        this.unsubscribeFromFirestore();
    };


    handleClick = (e) => {
        e.preventDefault();
    }

    handleEditRecipeClick = (e) => {
        e.preventDefault();
    }

    render() {
        console.log(this.state)
        const { isUser, userUID } = this.state;
        const { recipes = null } = this.state;
        return (
            <div>
                {recipes && <ul>
                    {recipes.map(recipe =>
                        <li style={{ "list-style-type": "none" }} key={recipe.id}>
                            <div>{recipe.name}</div>
                            <div>{recipe.recipe}</div>
                            <div>Added: {moment(recipe.addedOn.toDate().toString()).calendar()}, by: {recipe.userUID}</div>
                            {/* <ul>
                                {recipe.comments && recipe.comments.map(comment => <li>{comment}</li>)}
                            </ul> */}
                            <button type='button' onClick={this.handleEditRecipeClick}>Edit</button>
                        </li>)}
                </ul>}
                <button type='button' onClick={this.handleClick}>Add</button>
            </div>
        )
    }
}

export default RecipesList;