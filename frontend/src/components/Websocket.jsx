import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import Card from './card';

import { WebSocketContext } from "../contexts/WebSocketContext";

// interface NewsArticle {
//     url: string;
//     content: string;
//     asset: string;
//     published_at: Date;
//     sentiment ?: number;
//     id?: number;
// }
export const Websocket = () =>{
    const socket = useContext(WebSocketContext);
    const [messages,setMessages] = useState([]);
    useEffect(()=>{
        socket.on('connect',()=>{
          console.log('Connected!')
        })
        socket.on('initListArticles',(data) => {
          setMessages(data);
        });
        socket.on('newNewsArticle',(data) => {
          console.log('onMessage event received');
          console.log(data);
          setMessages((prev) => [...prev, data]);
        });
        return () => {            
            socket.off('connect')
            //socket.off('newNewsArticle')
        }
    },[]);

    return (
        <>            
            {messages && messages.map((e)=> {
                return <Card key={e.id} newsArticle={e}></Card>
            })}            
        </>
    );
}