import io from "socket.io-client";

const socket = io("http://webprogramozas.inf.elte.hu:3031", {
  transports: ["websocket", "polling", "flashsocket"],
});

export const sendMessage = (actMessage, parameters, callback) => {
  if (typeof parameters === "string") {
    parameters = [parameters];
  }
  socket.emit(actMessage, ...parameters, callback);
};

export const listener = (callback, parameters = []) => {
  socket.on("state-changed", (ack) => callback(ack, ...parameters));
};

export const getSocketID = () => {
  return socket.id;
};
