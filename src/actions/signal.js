import {initiateConnection, onTargetReady, sessionReady} from "./sessions";

let socket = null;

const mediaConstraints = {
  audio: true,
  video: true
};

export const sendToServer = message => {
  let msgJSON = JSON.stringify(message);
  console.log("Sending message:");
  console.log(message);
  socket.send(msgJSON);
};

export const startConnection = (session, user, token, dispatch) => {
  if (socket) {
    return;
  }

  console.log("-------Starting socket");
  socket = new WebSocket("ws://192.168.1.42:6503", "json");
  console.log(user);
  setTimeout(() => initiateConnection(user, session), 200);

  socket.onmessage = event => {
    let message = JSON.parse(event.data);
    console.log("Received Message: ");
    console.log(event);
    let time = new Date(message.date);
    let timeStr = time.toLocaleTimeString();

    switch (message.type) {
      case "target_is_ready":
        onTargetReady(dispatch);
        break;
      case "start_session":
        sessionReady(dispatch, user, session, message.payload, token);
        break;
    }
  }
};
