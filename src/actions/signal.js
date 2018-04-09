import {initiateConnection, onTargetReady, sessionReady} from "./sessions";

let socket = null;
let peerConnection = null;
let hasAddTrack = false;

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

export const startConnection = (session, user, token, dispatch, localStream, remoteStream) => {
  console.log("Streams");
  console.log(localStream);
  console.log(remoteStream);
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
        if (user.role === "instructor") {
          invite();
        }
        break;
      case "video-offer":  // Invitation and offer to chat
        handleVideoOfferMsg(message);
        break;
      case "video-answer":  // Callee has answered our offer
        handleVideoAnswerMsg(message);
        break;
      case "new-ice-candidate": // A new ICE candidate has been received
        handleNewICECandidateMsg(message);
        break;
      case "hang-up": // The other peer has hung up the call
        handleHangUpMsg(message);
        break;
      default:
        log_error("Unknown message received:");
        log_error(message);
    }
  };

  const createPeerConnection = () => {
    log("Starting peer connection");
    peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: "turn:numb.viagenie.ca:3478",
          username: "procsyma",
          credential: "159896"
        }
      ]
    });

    peerConnection.onicecandidate = handleICECandidateEvent;
    peerConnection.onnremovestream = handleRemoveStreamEvent;
    peerConnection.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
    peerConnection.onicegatheringstatechange = handleICEGatheringStateChangeEvent;
    peerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;
    peerConnection.onnegotiationneeded = handleNegotiationNeededEvent;

    hasAddTrack = (peerConnection.addTrack !== undefined);

    if (hasAddTrack) {
      peerConnection.ontrack = handleTrackEvent;
    } else {
      peerConnection.onaddstream = handleAddStreamEvent;
    }
  };

  const handleNegotiationNeededEvent = () => {
    log("*** Negotiation needed");
    log("---> Creating offer");
    peerConnection.createOffer()
      .then(offer => {
        log("---> Creating new description object to send to remote peer");
        return peerConnection.setLocalDescription(offer);
      })
      .then(() => {
        log("---> Sending offer to remote peer");
        sendToServer({
          type: "video-offer",
          payload: peerConnection.localDescription
        });
      })
      .catch(reportError);
  };

  const handleTrackEvent = event => {
    log("*** Track event");
    remoteStream.current.srcObject = event.streams[0];
  };

  const handleAddStreamEvent = event => {
    log("*** Stream added");
    remoteStream.current.srcObject = event.stream;
  };

  const handleRemoveStreamEvent = event => {
    log("*** Stream removed");
    closeVideoCall();
  };

  const handleICECandidateEvent = event => {
    if (event.candidate) {
      log("Outgoing ICE candidate: " + event.candidate.candidate);
      sendToServer({
        type: "new-ice-candidate",
        payload: event.candidate
      });
    }
  };

  const handleICEConnectionStateChangeEvent = event => {
    log("*** ICE socket state changed to " + peerConnection.iceConnectionState);
    switch (peerConnection.iceConnectionState) {
      case "closed":
      case "failed":
      case "disconnected":
        closeVideoCall();
        break;
    }
  };

  const handleSignalingStateChangeEvent = event => {
    log("*** WebRTC signaling state changed to: " + peerConnection.signalingState);
    switch (peerConnection.signalingState) {
      case "closed":
        closeVideoCall();
        break;
    }
  };

  const handleICEGatheringStateChangeEvent = event =>
    log("*** ICE gathering state changed to: " + peerConnection.iceGatheringState);

  const closeVideoCall = () => {
    log("Closing the call");

    if (peerConnection) {
      log("--> Closing the peer connection");
      peerConnection.onaddstream = null;
      peerConnection.ontrack = null;
      peerConnection.onremovestream = null;
      peerConnection.onnicecandidate = null;
      peerConnection.oniceconnectionstatechange = null;
      peerConnection.onsignalingstatechange = null;
      peerConnection.onicegatheringstatechange = null;
      peerConnection.onnotificationneeded = null;

      if (remoteStream.srcObject) {
        remoteStream.current.srcObject.getTracks().forEach(track => track.stop());
      }

      if (localStream.srcObject) {
        localStream.current.srcObject.getTracks().forEach(track => track.stop());
      }

      remoteStream.current.src = null;
      localStream.current.src = null;
      peerConnection.close();
      peerConnection = null;
    }
  };

  const handleHangUpMsg = message => {
    log("*** Received hang up notification from other peer");
    closeVideoCall();
  };

  const hangUpCall = () => {
    closeVideoCall();
    sendToServer({
      type: "hang-up"
    });
  };


  const handleVideoOfferMsg = message => {
    let localMedia = null;
    log("Starting to accept invitation from target");
    createPeerConnection();
    const desc = new RTCSessionDescription(message.payload);

    peerConnection.setRemoteDescription(desc)
      .then(() => {
        log("Setting up the local media stream...");
        return navigator.mediaDevices.getUserMedia(mediaConstraints);
      })
      .then(stream => {
        log("-- Local video stream obtained");
        localMedia = stream;
        localStream.current.src = window.URL.createObjectURL(localMedia);
        localStream.current.srcObject = localMedia;

        if (hasAddTrack) {
          log("-- Adding tracks to the RTCPeerConnection");
          localMedia.getTracks().forEach(track => peerConnection.addTrack(track, localMedia));
        } else {
          log("-- Adding stream to the RTCPeerConnection");
          peerConnection.addStream(localMedia);
        }

      })
      .then(() => {
        log("------> Creating answer");
        return peerConnection.createAnswer();
      })
      .then(answer => {
        log("------> Setting local description after creating answer");
        return peerConnection.setLocalDescription(answer);
      })
      .then(() => {
        log("Sending answer packet back to other peer");
        sendToServer({
          type: "video-answer",
          payload: peerConnection.localDescription
        });
      })
      .catch(handleGetUserMediaError);
  };

  const handleVideoAnswerMsg = message => {
    log("Call recipient has accepted our call");
    const desc = new RTCSessionDescription(message.payload);
    peerConnection.setRemoteDescription(desc).catch(reportError);
  };

  const handleNewICECandidateMsg = message => {
    const candidate = new RTCIceCandidate(message.payload);
    log("Adding received ICE candidate: " + JSON.stringify(candidate));
    peerConnection.addIceCandidate(candidate).catch(reportError);
  };

  const handleGetUserMediaError = error => {
    log(error);
    switch (error.name) {
      case "NotFoundError":
        alert("Unable to open your call because no camera and/or microphone were found.");
        break;
      case "SecurityError":
      case "PermissionDeniedError":
        break;
      default:
        alert("Error opening your camera and/or microphone: " + error.message);
        break;
    }
    closeVideoCall();
  };

  const invite = () => {
    log("Starting to prepare an invitation");
    if (peerConnection) {
      console.log("You can't start a call because you already have one open!");
      return;
    }

    log("Inviting target");
    log("Setting up socket to invite target");
    createPeerConnection();

    log("Requesting webcam access...");
    navigator.mediaDevices.getUserMedia(mediaConstraints)
      .then(localMedia => {
        log("-- Local video stream obtained");
        localStream.current.src = window.URL.createObjectURL(localMedia);
        localStream.current.srcObject = localMedia;

        if (hasAddTrack) {
          log("-- Adding tracks to the RTCPeerConnection");
          localMedia.getTracks().forEach(track => peerConnection.addTrack(track, localMedia));
        } else {
          log("-- Adding stream to the RTCPeerConnection");
          peerConnection.addStream(localMedia);
        }
      })
      .catch(handleGetUserMediaError);
  };
};

const log = text => {
  let time = new Date();
  console.log("[" + time.toLocaleTimeString() + "] " + text);
};

const log_error = text => {
  let time = new Date();
  console.error("[" + time.toLocaleTimeString() + "] " + text);
};

const reportError = error =>
  log_error("Error: " + error.name + ": " + error.message);

