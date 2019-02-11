import React, { Component } from 'react';

import { firestore } from '../../firebase/fbConfig';
import moment from 'moment';

class RecipesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: props.isUser,
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


    render() {
        console.log(this.state)
        const { isUser } = this.state;
        const { recipes = null } = this.state;
        return (
            <div>
                {recipes && <ul>
                    {recipes.map(recipe =>
                        <li style={{ "list-style-type": "none" }} key={recipe.id}>
                            <div>{recipe.name}</div>
                            <div>{recipe.recipe}</div> 
                            <div>Added: {moment(recipe.addedOn.toDate().toString()).calendar()}, by: {recipe.userUID}</div>
                        </li>)}
                </ul>}
            </div>
        )
    }
}

export default RecipesList;