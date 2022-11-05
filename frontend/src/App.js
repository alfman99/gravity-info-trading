import TradeViewChart from 'react-crypto-chart';
import './style.css';
import React from 'react';
import Image from "./imgs/logo.png";
import Card from './components/card';
import { socket, WebsocketProvider } from './contexts/WebSocketContext';
import { Websocket } from './components/Websocket';

export default function App() {
  const card ={
    title: "Some sample Title",
    sentiment: "positive"
  }
  const cardList = [card,card,card];
  return (   
    <div className="parent">
      <WebsocketProvider value={socket}>
        <Websocket/>
      </WebsocketProvider>
      <div class="myheader">
        <img width="50px" src={Image}/>
      </div>
      <div class="pageContent">
        <div class="news" align="left">
          {/* <Card object={card}></Card> */}
          {cardList && cardList.map((e)=> {
            return <Card object={e}></Card>
          })}
          
        </div>
        <div class="chart">
          <h3>ETH/USDT</h3>
          <TradeViewChart
          containerStyle={{
            minHeight: '600px',
            minWidth: '500%',
            //with: '100%',
            marginBottom: '30px',
            marginLeft: '50px',
          }}
          pair="ETHUSDT"
          />
        </div>
      </div>
      
      
    </div>
  );
}