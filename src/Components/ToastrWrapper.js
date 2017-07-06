import React from 'react';
import { Toastr } from './Toastr';
import Reducer from '../Reducers';
import ReactDOM from 'react-dom';

export class ToastrWrapper extends React.Component {
    constructor(props) {
        super(props);
        Reducer.message.subscribe(this.componentDidMount);
    }
    componentDidMount() {
        /* setTimeout(function () {
                  Reducer.toastr.dispatch({ type: 'RESET_STATE' });
         },6000);*/
        ReactDOM.render(<Toastr message="" />, document.getElementById('toastr'));
        var messageState = Reducer.message.getState();
        var messages = [];
        //messages.push("hi");
        messages = Reducer.getMessages(messageState.getMessageReducer);
        if (messages.length != 0) {
            Reducer.toastr.dispatch({
                type: 'SET_STATE'
            });

            
                ReactDOM.render(<Toastr message={messages[0]} />, document.getElementById('toastr'));
            
            setTimeout(function () {
                Reducer.toastr.dispatch({ type: 'RESET_STATE' });
                //this.forceUpdate();
                Reducer.message.dispatch({
                    type: 'REMOVE_MESSAGE'
                });
                ReactDOM.render(<Toastr message={messages[0]} />, document.getElementById('toastr'));
            }, 6000);

        }

    }
    render() {
        /*var messageState = Reducer.message.getState();
        var messages = [];
        //messages.push("hi");
        messages = Reducer.getMessages(messageState.getMessageReducer);
        if (messages.length != 0) {
            Reducer.toastr.dispatch({
                type: 'SET_STATE'
            });

            /*setTimeout(function () {
                ReactDOM.render(<Toastr message={messages[0]} />, document.getElementById('toastr'));
            }, 3000);
            setTimeout(function () {
                Reducer.toastr.dispatch({ type: 'RESET_STATE' });
                //this.forceUpdate();
                ReactDOM.render(<Toastr message={messages[0]} />, document.getElementById('toastr'));
            }, 6000);
            Reducer.message.dispatch({
                type: 'REMOVE_MESSAGE'
            });
        }*/
        return <div></div>;

    }
}