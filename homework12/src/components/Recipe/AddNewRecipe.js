import React, { Component, Fragment } from 'react';

import { firestore } from '../../firebase/fbConfig';
import moment from 'moment';


class AddNewRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: props.isUser,
            userUID: props.userUID,
            userName: props.userName,
            recipe: {},
            recipeName: '',
            recipeContent: '',
        }
    }

    handleClickSaveRecipe = (event) => {
        event.preventDefault();
        const { recipe, recipeName, recipeContent, userName, userUID } = this.state;
        recipe.name = recipeName;
        recipe.recipe = recipeContent;
        recipe.comments = [];
        recipe.addedOn = new Date();
        recipe.userName = userName;
        recipe.userUID = userUID;
        firestore.collection("recipes").add({ ...recipe });
        this.props.history.push('/');
    }


    handleChange = (event) => {
        const { value, name } = event.target;

        this.setState({
            [name]: value,
        });
    }


    handleReturnToList = (event) => {
        event.preventDefault();
        this.props.history.push('/');
    }

    render() {
        const { isUser } = this.props;
        const { recipeName = null, recipeContent = null } = this.state;
        return (
            <Fragment>
                <h3>Add New Recipe</h3>

                {isUser &&
                    <Fragment>
                        <div>
                            <input type='text' name='recipeName' value={recipeName} onChange={this.handleChange} placeholder='enter name...' />
                        </div>
                        <div>
                            <input type='text' name='recipeContent' value={recipeContent} onChange={this.handleChange} placeholder='enter recipe...' />
                        </div>
                        <button type='button' onClick={this.handleClickSaveRecipe}>Save recipe</button>
                    </Fragment>
                }
                <button type='button' onClick={this.handleReturnToList}>Return</button>
            </Fragment>
        )
    }
}

export default AddNewRecipe;