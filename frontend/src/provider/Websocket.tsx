import { Badge, Group } from "@mantine/core";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import NewsCard from "../component/NewsCard";

import { WebSocketContext } from "../contexts/WebSocketContext";
import { determineSentiment, Sentiment } from "../util/util";

export interface NewsArticle {
    url: string;
    content: string;
    asset: string;
    published_at: Date;
    sentiment_positive: number;
    sentiment_negative: number;
    id?: number;
}


const countPositiveArticles = (articles: NewsArticle[]) => {
  return articles.filter(article => determineSentiment(article) === Sentiment.Positive).length;
}

const countNeutralArticles = (articles: NewsArticle[]) => {
  return articles.filter(article => determineSentiment(article) === Sentiment.Neutral).length;
}

const countNegativeArticles = (articles: NewsArticle[]) => {
  return articles.filter(article => determineSentiment(article) === Sentiment.Negative).length;
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
          <Badge variant="light" color="green">Positive: {countPositiveArticles(messages)}</Badge>
          <Badge variant="light" color="gray">Neutral: {countNeutralArticles(messages)}</Badge>  
          <Badge variant="light" color="red">Negative: {countNegativeArticles(messages)}</Badge>  
        </Group>  
        <div style={{ overflow: 'auto', paddingRight: '0.5em', height: '95%' }}>   
            {messages && messages.map((newsArticle)=> {
                return <NewsCard key={newsArticle.id} news={newsArticle} />
            })}            
        </div>
      </>
    );
}