import { createContext } from "react";
import {io, Socket } from "socket.io-client";

export const socket = io('http://localhost:3000/news'); // context instance declaration
export const WebSocketContext = createContext<Socket>(socket);
export const WebsocketProvider = WebSocketContext.Provider