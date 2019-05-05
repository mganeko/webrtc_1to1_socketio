'use strict';

// シグナリングサーバへ接続する
export function connectSignaling(room) {
  //let wsUrl = 'ws://localhost:3001/';
  //if (url) {
  //  wsUrl = url;
  //}
  //ws = new WebSocket(wsUrl);

  if (socket) {
    socket.close();
    socket = null;
    //clientId = null;
  }
  socket = io.connect('/');

  socket.on('connect', function (evt) {
    console.log('socket.io connected. enter room=' + room);
    socket.emit('enter', room);
    //resolve();
  });
  socket.on('error', function (err) {
    console.error('socket.io ERROR:', err);
    reject(err);
  });
  socket.on('disconnect', function (evt) {
    console.log('socket.io disconnect:', evt);
  });

  /*
  ws.onmessage = (evt) => {
    //console.log('ws onmessage() data.type:', evt.data.type);
    const message = JSON.parse(evt.data);
    console.log('ws onmessage() message.type:', message.type);
    switch (message.type) {
      case 'offer': {
        console.log('Received offer ...');
        receiveSdpFunc(message, message.type);
        break;
      }
      case 'answer': {
        console.log('Received answer ...');
        receiveSdpFunc(message, message.type);
        break;
      }
      case 'candidate': {
        console.log('Received ICE candidate ...');
        const candidate = new RTCIceCandidate(message.ice);
        console.log(candidate);
        receiveIceCandidate(candidate);
        break;
      }
      case 'close': {
        console.log('peer is closed ...');
        closedFunc();
        break;
      }
      default: {
        console.log("Invalid message");
        break;
      }
    }
  };
*/

  socket.on('message', function (message) {
    console.log('socket.io message:', message.type);
    switch (message.type) {
      case 'offer': {
        console.log('Received offer ...');
        receiveSdpFunc(message, message.type);
        break;
      }
      case 'answer': {
        console.log('Received answer ...');
        receiveSdpFunc(message, message.type);
        break;
      }
      case 'candidate': {
        console.log('Received ICE candidate ...');
        const candidate = new RTCIceCandidate(message.ice);
        console.log(candidate);
        receiveIceCandidate(candidate);
        break;
      }
      case 'close': {
        console.log('peer is closed ...');
        closedFunc();
        break;
      }
      default: {
        console.log("Invalid message");
        break;
      }
    }
  });
};

export function sendSdp(sessionDescription) {
  //const message = JSON.stringify(sessionDescription);
  //console.log('---sending SDP type=' + sessionDescription.type);
  //ws.send(message);

  socket.emit('message', sessionDescription);
}

export function sendIceCandidate(candidate) {
  console.log('---sending ICE candidate ---');
  //const message = JSON.stringify({ type: 'candidate', ice: candidate });
  //console.log('sending candidate=' + message);
  //ws.send(message);

  const obj = { type: 'candidate', ice: candidate };
  socket.emit('message', obj);
}

export function sendClose() {
  //const message = JSON.stringify({ type: 'close' });
  console.log('---sending close message---');
  //ws.send(message);

  const obj = { type: 'bye' };
  socket.emit('message', obj);
}

export function setRceiveSdpHandeler(handler) {
  receiveSdpFunc = handler;
}
let receiveSdpFunc = null;

export function setReceiveIceCandidateHandeler(handler) {
  receiveIceCandidate = handler;
}
let receiveIceCandidate = null;

export function setCloseHander(handler) {
  closedFunc = handler;
}
let closedFunc = null;

// ---- inner variable, function ----
//let ws = null;
let socket = null;

