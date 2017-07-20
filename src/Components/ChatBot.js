import React from 'react';
import { ChatRoom } from './ChatRoom';
import Reducer from '../Reducers';

export class ChatBot extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isShow: false, showDropDown: false, messages: [] }

        this.toggleChat = this.toggleChat.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.clearAllMessages = this.clearAllMessages.bind(this);
        this.fetchMessages = this.fetchMessages.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    
    componentDidMount() {
        this.timerID = setInterval(
            () => this.fetchMessages(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    fetchMessages() {
        fetch('http://10.22.14.66:3100')
            .then(res => {
                return res.json();
            }).then(data => {
                this.setState({ messages: data });
                var objDiv = document.getElementById("style-2");
                objDiv.scrollTop = objDiv.scrollHeight;
            });

        this.forceUpdate();
    }

    handleKeyPress(postData) {
        /*console.log(this.refs.text.value);
        var postData = {
           
            MessageText: this.refs.text.value,
            MessageAT: Date.now()
        };
        console.log(postData);
        if (event != null && event.key == 'Enter') {*/
        fetch('http://10.22.14.66:3100', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(postData)
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                //alert(data);
                this.fetchMessages();

            })

        //this.setState({ messages: this.state.messages.push(postData) });

        //}
    }

    toggleChat() {
        console.log('inside toggle');
        this.setState({ isShow: !this.state.isShow });
    }

    toggleDropDown() {
        console.log('inside drop-toggle');
        this.setState({ showDropDown: !this.state.showDropDown });
    }

    clearAllMessages() {
        fetch('http://10.22.14.66:3100/clear')
            .then(res => {
                return res.json();
            }).then(data => {
                //alert(data);
                Reducer.message.dispatch({ type: 'ADD_MESSAGE', message: data });
                this.setState({ showDropDown: !this.state.showDropDown });
                this.fetchMessages();
            });
    }

    render() {

        var botClass = "";
        var roomClass = "";
        var dropClass = "";
        var menuClass = "";
        if (this.state.isShow) {
            botClass = "chatbot-maximize";
            roomClass = "chat-room-show";
            menuClass = "menu-label-show";
        }
        else {
            botClass = "chatbot-minimize";
            roomClass = "chat-room-hide";
            menuClass = "menu-label-hide";
        }
        if (this.state.showDropDown) {
            dropClass = "chat-drop-show";
        }
        else {
            dropClass = "chat-drop-hide";
        }
        return (
            <div>
                <div className={botClass} onClick={this.toggleChat}>
                    <g>
                        <svg width="200px" height="50px">
                            <rect x="0" y="0" rx="20" ry="20" width="160" height="40" className="chatbot-rect" />
                            Sorry, your browser does not support inline SVG.
                        <text x="30" y="21">Chat     </text>
                        </svg>
                    </g>

                </div>
                <div className={menuClass}>
                    <label htmlFor=""><span className="fa fa-bars" onClick={this.toggleDropDown}></span></label>
                </div>
                <div className={dropClass}>
                    <label htmlFor="" onClick={this.clearAllMessages}>Clear All</label>
                </div>
                <div>
                    <ChatRoom className={roomClass} handleKeyPress={this.handleKeyPress} messages={this.state.messages} />
                </div>
            </div>
        );

    }
}