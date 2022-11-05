import TradeViewChart from 'react-crypto-chart';
import './style.css';
import React from 'react';
import Image from "./imgs/logo.png";
import { socket, WebsocketProvider } from './contexts/WebSocketContext';
import { Websocket } from './components/Websocket';
import { Grid, GridItem } from '@chakra-ui/react'


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
      <Grid
        h='100%'
        w='100%'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={'0'}
      >
        <GridItem rowSpan={2} colSpan={1} bg='#282c34' > 
          <WebsocketProvider value={socket}>
              <Websocket/>
          </WebsocketProvider>
        </GridItem>
        <GridItem colSpan={2} bg='papayawhip' ><h3>ETH/USDT</h3></GridItem>
        {/* <GridItem colSpan={2} bg='papayawhip' /> */}
        <GridItem colSpan={4} bg='grey' >
          <div >
            <TradeViewChart
            containerStyle={{
              minHeight: '600px',
              minWidth: '90%',
              //with: '100%',
              marginBottom: '30px',
              marginLeft: '50px',
            }}
            pair="ETHUSDT"
            />
          </div>
        </GridItem>
      </Grid>
      {/* <div className="pageContent">
        
        <div className="news" align="left"> */}
          {/* <Card object={card}></Card> */}
          {/* {cardList && cardList.map((e,n)=> {
            return <Card key={n} object={e}></Card>
          })} */}
          
          
        {/* </div>
        
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
      </div> */}
      
      
    </div>
  );
}