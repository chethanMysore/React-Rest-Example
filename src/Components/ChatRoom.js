import React from "react";
import cookie from "react-cookies";

export class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    //this.fetchMessages = this.fetchMessages.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    // this.fetchMessages();
  }

  /*fetchMessages() {
        fetch('http://localhost:3050')
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
    var postData = {
      SenderName: "user" + cookie.load("appId").toString(),
      MessageText: this.refs.text.value,
      MessageAT: Date.now(),
    };

    if (event != null && event.key == "Enter") {
      this.props.handleKeyPress(postData);
      this.refs.text.value = "";
      /* fetch('http://localhost:3050', {
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
    var textClass = "";
    messages = this.props.messages;
    messages.map((message) => {
      if (
        new Date(message.MessageAT) != "Invalid Date" &&
        new Date(message.MessageAT).getDay() == new Date().getDay()
      ) {
        message.MessageAT = new Date(message.MessageAT).toLocaleTimeString();
      } else if (new Date(message.MessageAT) != "Invalid Date") {
        message.MessageAT = new Date(message.MessageAT).toLocaleString();
      }
      if (
        message.SenderName != "" &&
        message.SenderName == "user" + cookie.load("appId").toString()
      ) {
        message.textClass = "label-me";
        message.rectStyle = "rect-me";
      } else {
        message.textClass = "label-other";
        message.rectStyle = "rect-other";
      }
    });

    return (
      <div className={this.props.className}>
        <br />
        <div>
          <input
            type="text"
            placeholder="Type Message Here"
            className="input"
            ref="text"
            onKeyPress={this.handleKeyPress}
          />
          <div className="chat-room-message" id="style-2">
            {messages.map((message) => (
              <div key={message._id}>
                {message.textClass == "label-me" ? (
                  <div style={{ height: "50px" }}>
                    <svg width="125" height="50" className={message.textClass}>
                      <g>
                        {/* <rect x="0" y="0" rx="20" ry="20" width="120" height="25" className="rectStyle" />
                                        <polygon points="10,45 15,25 25,25" style={{fill:"#3e9b09",stroke:"#3e9b09",strokeWidth:"1"}} />
                                        Sorry, your browser does not support inline SVG.
                                        <text x="30" y="15">{message.MessageText}</text>*/}
                        <rect
                          x="0"
                          y="0"
                          rx="20"
                          ry="20"
                          width="115"
                          height="25"
                          className={message.rectStyle}
                        />
                        <polygon
                          points="100,25 110,22 115,40"
                          style={{
                            fill: "#fce5a6",
                            stroke: "#fce5a6",
                            strokeWidth: "1",
                          }}
                        />
                        Sorry, your browser does not support inline SVG.
                        <text x="10" y="15">
                          {message.MessageText}
                        </text>
                      </g>
                    </svg>
                    <sub
                      style={{
                        fontSize: "8px",
                        fontFamily: "Comic Sans MS,cursive,sans-serif",
                        textShadow: "0px 0px 0px #335f6f",
                        position: "relative",
                        top: "-33px",
                        left: "-25px",
                        paddingLeft: "12px",
                      }}
                    >
                      {message.MessageAT}
                    </sub>
                  </div>
                ) : (
                  <div style={{ height: "50px" }}>
                    <svg width="125" height="50" className={message.textClass}>
                      <g>
                        <rect
                          x="0"
                          y="0"
                          rx="20"
                          ry="20"
                          width="115"
                          height="25"
                          className={message.rectStyle}
                        />
                        <polygon
                          points="10,45 15,25 25,25"
                          style={{
                            fill: "#83c0f7",
                            stroke: "#83c0f7",
                            strokeWidth: "1",
                          }}
                        />
                        Sorry, your browser does not support inline SVG.
                        <text x="10" y="15">
                          {message.MessageText}
                        </text>
                        <sub
                          style={{
                            fontSize: "8px",
                            fontFamily: "Comic Sans MS,cursive,sans-serif",
                            textShadow: "0px 0px 0px #335f6f",
                            position: "relative",
                            top: "-34px",
                            left: "-37px",
                          }}
                        >
                          {message.MessageAT}
                        </sub>
                        {/*<rect x="0" y="0" rx="20" ry="20" width="120" height="25" className="rectStyle" />
                                        <polygon points="100,25 110,22 115,40" style={{fill:"#3e9b09",stroke:"#3e9b09",strokeWidth:"1"}} />
                                        Sorry, your browser does not support inline SVG.
                                        <text x="30" y="15">{message.MessageText}</text>*/}
                      </g>
                    </svg>
                    <sub
                      style={{
                        fontSize: "8px",
                        fontFamily: "Comic Sans MS,cursive,sans-serif",
                        textShadow: "0px 0px 0px #335f6f",
                        position: "relative",
                        top: "-34px",
                        left: "-37px",
                      }}
                    >
                      {message.MessageAT}
                    </sub>
                  </div>
                )}

                {/*<div className={message.textClass}>{message.MessageText}

                                    <sub style={{ fontSize: '8px', fontFamily: 'Comic Sans MS,cursive,sans-serif', textShadow: '0px 0px 0px #335f6f' }}>{message.MessageAT}</sub>
                                </div>*/}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
