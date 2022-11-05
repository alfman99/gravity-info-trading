import TradeViewChart from 'react-crypto-chart';
import './style.css';
import React from 'react';
import Image from "./imgs/logo.png";
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
      <div className="myheader">
        <img width="50px" src={Image}/>
      </div>
      <div className="pageContent">
        
        <div className="news" align="left">
          {/* <Card object={card}></Card> */}
          {/* {cardList && cardList.map((e,n)=> {
            return <Card key={n} object={e}></Card>
          })} */}
          <WebsocketProvider value={socket}>
           <Websocket/>
          </WebsocketProvider>
          
        </div>
        
        <div className="chartContainer">
          <div className="chartHeader">
              <h3>ETH/USDT</h3>
          </div>
          <div>
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
      
      
    </div>
  );
}