//React dependencies
import React, { Component } from 'react';

//AddDevice component
import { AddDevice } from './AddDevice';

//Redux Reducer
import Reducer from '../Reducers';

//A Wrapper for AddDevice Component 
export class AddDeviceWrapper extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }

    //Render method of AddDeviceWrapper - creates the AddDevice Component
    render() {
        return <AddDevice />;
    }
}


