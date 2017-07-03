import React from 'react';
import Reducer from '../Reducers';

export class Toastr extends React.Component {
    constructor(props) {
        super(props);
        Reducer.toastr.subscribe(this.render);
    }
  
    render() {
        const toastrStyle = {
            backgroundColor: '#3e9b09',
            color: 'red',
            position: 'absolute',
            left: '10px',
            top: '10px',
            width: '350px',
            height: '25px',
            opacity: '0.7',
            transition: '2s'
        }
        var toastrState = Reducer.toastr.getState();
        var renderState = Reducer.getToastrState(toastrState.getToastrReducer);
        var message = this.props != undefined?this.props.message:"";
       
        if(!renderState.render)
        {
            document.getElementById('toastr').style.transition = '2s';
            document.getElementById('toastr').style.opacity = 0;
        }
        return (
            <div className="toastrStyle">
               
                {message}
                
                
            </div>
        );
    }
}