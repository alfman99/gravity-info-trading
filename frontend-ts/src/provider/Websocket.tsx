import { Group } from "@mantine/core";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import NewsCard from "../component/NewsCard";

import { WebSocketContext } from "../contexts/WebSocketContext";

export interface NewsArticle {
    url: string;
    content: string;
    asset: string;
    published_at: Date;
    positive_sentiment: number;
    negative_sentiment: number;
    id?: number;
}

export const Websocket = () => {
    const socket = useContext(WebSocketContext);
    const [messages,setMessages] = useState<NewsArticle[]>([]);
    useEffect(()=>{
        socket.on('connect',()=>{
          console.log('Connected!')
        })
        socket.on('initListArticles',(data) => {
          console.log('initListArticles', data)
          setMessages(data);
        });
        socket.on('newNewsArticle',(data) => {
          console.log('onMessage event received');
          console.log(data);
          setMessages((prev) => [...prev, data]);
        });
        return () => {            
            socket.off('connect')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        <Group grow mb='sm'>
          <div style={{
            backgroundColor: 'red'
          }}>5</div>  
          <div style={{
            backgroundColor: 'red'
          }}>6</div>  
        </Group>  
        <div style={{ overflow: 'auto', paddingRight: '0.5em' }}>   
            {messages && messages.map((newsArticle)=> {
                return <NewsCard key={newsArticle.id} news={newsArticle} />
            })}            
        </div>
      </>
    );
}