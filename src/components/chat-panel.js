import React from "react";
import {reduxForm} from "redux-form";
import {Field} from "redux-form";
import {ChatMessage} from "./chat-message";

const ChatPanel = (handleSubmit, chat, user, target) => {
  return (
    <div className="panel chat">

      <div className="panel-header">
        <div className="panel-title h6">Chat</div>
      </div>

      <div className="panel-body">
        {console.log(chat)}
        {chat.map((message, index) => {
            let name, avatar;
            if (!message.id) {
              name = message.owner === "self" ? user.name : `${target.firstName} ${target.lastName}`;
              avatar = message.owner === "self" ? user.avatar : target.imageLink;
            } else {
              name = user.id == message.senderId ? user.name : `${target.firstName} ${target.lastName}`;
              avatar = user.id == message.senderId ? user.avatar : target.imageLink;
            }
           return <ChatMessage key={index} avatar={avatar} name={name} message={message.body}/>
          }
        )}
      </div>

      <div className="panel-footer">
        <div className="input-group">
          <form onSubmit={handleSubmit}>
            <Field name="message" component={<input {...input} className="form-input" type="text"/>}/>
            <button className="btn btn-primary input-group-btn">Send</button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default reduxForm({
  form: "chatForm"
})(ChatPanel);
