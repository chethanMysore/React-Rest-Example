import React from 'react';
import Reducer from '../Reducers';

export class Toastr extends React.Component {
    constructor(props) {
        super(props);
        Reducer.toastr.subscribe(this.render);
    }

    render() {
        /* const toastrStyle = {
             backgroundColor: '#3e9b09',
             color: 'red',
             position: 'absolute',
             left: '10px',
             top: '10px',
             width: '350px',
             height: '25px',
             opacity: '0.7',
             transition: '2s'
         }*/
         
        var toastrState = Reducer.toastr.getState();
        var renderState = Reducer.getToastrState(toastrState.getToastrReducer);
        var message = this.props != undefined ? this.props.message : "";
        var className = this.props != undefined ? this.props.className : "toastr-fade-out";
        if (!renderState.render) {
            className = "toastr-fade-out";
        }
        else {
            className = "toastrStyle";
        }
        
        return (
            
             <div className={className}>
                <svg width="350" height="180">
                    <g>
                        <rect x="5" y="0" rx="20" ry="20" width="300" height="40" className="rectStyle" />
                        Sorry, your browser does not support inline SVG.
                        <text x="30" y="21">{message}</text>
                    </g>
                </svg>
             </div>
        );
    }
}