import React from 'react';
import { ChatRoom } from './ChatRoom';
export class ChatBot extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isShow: false }
        this.toggleChat = this.toggleChat.bind(this);
    }
    toggleChat(){
        console.log('inside toggle');
        this.setState({isShow: !this.state.isShow});
    }
    render() {
        var botClass = "";
        var roomClass = "";
        if (this.state.isShow) {
            botClass = "chatbot-maximize";
            roomClass = "chat-room-show";
        }
        else{
             botClass = "chatbot-minimize";
            roomClass = "chat-room-hide";
        }
        return (
            <div>
                <div className={botClass} onClick={this.toggleChat}>
                    <g>
                        <svg width="200px" height="50px">
                            <rect x="0" y="0" rx="20" ry="20" width="160" height="40" className="chatbot-rect" />
                            Sorry, your browser does not support inline SVG.
                        <text x="30" y="21">Chat </text>
                        </svg>
                    </g>

                </div>
                <div>
                    <ChatRoom className={roomClass} />
                </div>
            </div>
        );

    }
}