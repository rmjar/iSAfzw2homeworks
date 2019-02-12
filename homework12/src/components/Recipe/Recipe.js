import React, { Component } from 'react';

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

    render() {
        return null;
    }
}

export default Recipe;