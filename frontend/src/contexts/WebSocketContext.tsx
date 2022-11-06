import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io(`http://localhost:3000/news`, { transports : ['websocket'] }); // context instance declaration
export const WebSocketContext = createContext(socket);
export const WebsocketProvider = WebSocketContext.Provider