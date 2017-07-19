import React from 'react';

export class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] }
        //this.fetchMessages = this.fetchMessages.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    componentDidMount() {
       
        // this.fetchMessages();
    }

    /*fetchMessages() {
        fetch('http://localhost:3100')
            .then(res => {
                return res.json();
            }).then(data => {
                this.setState({ messages: data });
                var objDiv = document.getElementById("style-2");
                objDiv.scrollTop = objDiv.scrollHeight;
            });

        this.forceUpdate();
    }*/
    handleKeyPress(event) {
        console.log(this.refs.text.value);
        var postData = {

            MessageText: this.refs.text.value,
            MessageAT: Date.now()
        };
        console.log(postData);

        if (event != null && event.key == 'Enter') {
            this.props.handleKeyPress(postData);
             this.refs.text.value = "";
            /* fetch('http://localhost:3100', {
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
 
             //this.setState({ messages: this.state.messages.push(postData) });*/

        }
    }
    render() {
        //this.fetchMessages();
        //var className = this.props.show?"chat-room-show":"chat-room-hide";
        var messages = [];
        messages = this.props.messages;
        messages.map(message => {
            if (new Date(message.MessageAT) != 'Invalid Date' && new Date(message.MessageAT).getDay() == new Date().getDay()) {
                message.MessageAT = new Date(message.MessageAT).toLocaleTimeString();
            }
            else if ((new Date(message.MessageAT)) != 'Invalid Date') {
                message.MessageAT = new Date(message.MessageAT).toLocaleString();
            }


        });
        console.log(messages);
        return (
            <div className={this.props.className}>
                <br />
                <div>
                    <input type="text" placeholder="Type Message Here" className="input" ref="text" onKeyPress={this.handleKeyPress} />
                    <div className="chat-room-message" id="style-2">
                        {messages.map(message =>

                            <div key={message._id}>
                                <label className="label">{message.MessageText}</label>

                                <sub><label style={{ fontSize: '8px', fontFamily: 'Comic Sans MS,cursive,sans-serif' }}>{message.MessageAT}</label></sub>
                            </div>

                        )}
                    </div>
                </div>
            </div>
        );
    }
}