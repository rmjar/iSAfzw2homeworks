import React, { Component, Fragment } from 'react';

import { firestore } from '../../firebase/fbConfig';
import moment from 'moment';


class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeId: props.match.params.id,
            isUser: props.isUser,
            userUID: props.userUID,
        }
    }

    unsubscribeFromFirestore = null;

    getRecipe = () => {
        const dbRef = firestore.collection("recipes").doc(this.state.recipeId);
        this.unsubscribeFromFirestore = dbRef.get()
            .then(doc => {
                this.setState({ recipe: doc.data() })
            });
    }

    componentDidMount = () => {
        this.getRecipe();
        console.log(this.state)
    };

    componentWillUnmount = () => {
        this.unsubscribeFromFirestore();
    };

    render() {

        const { recipe = null } = this.state;
        const { recipe: { comments = null } = {} } = this.state
        return (recipe &&
            <Fragment>
                <h3>Recipe</h3>
                <div>{recipe.name}</div>
                <div>{recipe.recipe}</div>
                <div>Added: {moment(recipe.addedOn.toDate().toString()).calendar()}, by: {recipe.userUID}</div>
                {comments && <ul>
                    {recipe.comments && recipe.comments.map(comment => <li>{comment}</li>)}
                </ul>}
            </Fragment>)
    }
}

export default Recipe;