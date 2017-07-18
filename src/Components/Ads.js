//React Dependencies
import React, { Component } from 'react';
import { ChatBot } from './ChatBot';

//Ads Component - render ads
export class Ads extends Component {
    //Render method of Ads component - creates ads
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-2"><h3><i>This div will display Ads</i></h3></div>
                </div>
                <div className="row ">
                    <div className="col-sm-2"> 
                        <ChatBot />
                    </div>
                </div>
            </div>
        );
    }
}