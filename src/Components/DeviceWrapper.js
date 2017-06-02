//React Dependencies
import React,{Component} from 'react';

//DeviceList Component
import {DeviceList} from './DeviceList';

//A Wrapper to DeviceList Component
export class DeviceWrapper extends Component{
    constructor(props){
        super(props);
        this.render = this.render.bind(this);    
    }

    //Render method of Device Wrapper - creates the DeviceList component
    render (){
        return <DeviceList />;
    }
}


