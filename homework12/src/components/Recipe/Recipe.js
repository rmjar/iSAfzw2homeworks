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
        if (this.state.recipeId) {
            const dbRef = firestore.collection("recipes").doc(this.state.recipeId);
            this.unsubscribeFromFirestore = dbRef.get()
                .then(doc => {
                    this.setState({
                        recipe: doc.data(),
                        recipeName: doc.data().name,
                        recipeContent: doc.data().recipe,
                    })
                });
        } else {
            this.props.history.push('/');
        }
    }

    saveComment = (event) => {
        const { recipe, comment } = this.state;
        event.preventDefault();
        if (comment) {
            if (!recipe.comments) {
                recipe.comments = [];
            }
            recipe.comments.push(this.state.comment);
            const dbRef = firestore.collection("recipes").doc(this.state.recipeId);
            dbRef.update(recipe);
        }
        this.setState({
            addComment: false,
            comment: '',
        })
    }

    handleClickSaveRecipe = (event) => {
        event.preventDefault();
        const { recipe, recipeName, recipeContent } = this.state;
        recipe.name = recipeName;
        recipe.recipe = recipeContent;
        const dbRef = firestore.collection("recipes").doc(this.state.recipeId);
        dbRef.update(recipe);
        this.props.history.push('/');
    }

    componentDidMount = () => {
        this.getRecipe();
    };

    componentWillUnmount = () => {
        if (this.unsubscribeFromFirestore &&
            this.unsubscribeFromFirestore.value) {
            this.unsubscribeFromFirestore();
        }
    };

    handleChange = (event) => {
        const { value, name } = event.target;

        this.setState({
            [name]: value,
        });
    }

    handleClickAddComment = (event) => {
        event.preventDefault();
        this.setState({
            addComment: true,
        })
    }

    handleReturnToList = (event) => {
        event.preventDefault();
        this.props.history.push('/');
    }

    render() {
        const { isUser } = this.props;
        const { recipe = null } = this.state;
        const { comments = [] } = this.state.recipe || {};
        const { recipeName = null, recipeContent = null, addComment = false, comment = null } = this.state;
        return (
            <Fragment>
                <h3>Recipe</h3>
                {!isUser && recipe &&
                    <Fragment>
                        <div>{recipe.name}</div>
                        <div>{recipe.recipe}</div>
                        <div>Added: {moment(recipe.addedOn.toDate().toString()).calendar()}, by: {recipe.userName}</div>
                        {comments && <ul>
                            {comments && comments.map(comment => <li>{comment}</li>)}
                        </ul>}
                    </Fragment>
                }

                {isUser && recipe &&
                    <Fragment>
                        <div>
                            <input type='text' name='recipeName' value={recipeName} onChange={this.handleChange} placeholer='enter name...' />
                        </div>
                        <div>
                            <input type='text' name='recipeContent' value={recipeContent} onChange={this.handleChange} placeholer='enter recipe...' />
                        </div>
                        <div>Added: {moment(recipe.addedOn.toDate().toString()).calendar()}, by: {recipe.userName}</div>
                        {comments && <ul>
                            {recipe.comments && recipe.comments.map(comment => <li>{comment}</li>)}
                        </ul>}
                        {addComment &&
                            <span><input type='text' name='comment' value={comment} onChange={this.handleChange} placeholer='enter comment...' />
                                <button type='button' onClick={this.saveComment}>{comment ? 'Save' : 'Cancel'}</button>
                            </span>}
                        {!addComment && <button type='button' onClick={this.handleClickAddComment}>Add comment</button>}
                        <button type='button' onClick={this.handleClickSaveRecipe}>Save recipe</button>
                    </Fragment>
                }
                <button type='button' onClick={this.handleReturnToList}>Return</button>
            </Fragment>
        )
    }
}

export default Recipe;