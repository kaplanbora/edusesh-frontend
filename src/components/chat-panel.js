import React from "react";
import {reduxForm} from "redux-form";
import {Field} from "redux-form";
import {ChatMessage} from "./chat-message";

const GenericInput = ({input}) => (<input {...input} className="form-input" type="text"/>);

const ChatPanel = ({handleSubmit, chat, user, target}) => {
  return (
    <div className="panel chat">

      <div className="panel-header">
        <div className="panel-title h6">Chat</div>
      </div>

      <div className="panel-body">
        {chat.map((message, index) => {
            let name, avatar;
            if (!message.id) {
              name = message.owner === "self" ? user.name : `${target.profile.firstName} ${target.profile.lastName}`;
              avatar = message.owner === "self" ? `https://robohash.org/${user.id}?set=set3` : `https://robohash.org/${target.credentials.id}?set=set3`;
            } else {
              name = user.id == message.senderId ? user.name : `${target.profile.firstName} ${target.profile.lastName}`;
              avatar = user.id == message.senderId ? `https://robohash.org/${user.id}?set=set3` : `https://robohash.org/${target.credentials.id}?set=set3`;
            }
           return <ChatMessage key={index} avatar={avatar} name={name} message={message.body}/>
          }
        )}
      </div>

      <div className="panel-footer">
        <div className="input-group">
          <form onSubmit={handleSubmit}>
            <Field name="message" component={GenericInput}/>
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
