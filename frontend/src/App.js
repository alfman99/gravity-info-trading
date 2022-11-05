import TradeViewChart from 'react-crypto-chart';
import './style.css';
import React from 'react';
import { Box } from '@chakra-ui/react'
//import { Image } from '@chakra-ui/react'
import Image from "./imgs/logo.png";

export default function App() {
  return (   
    <div className="parent">
      <div class="myheader">
        <img width="50px" src={Image}/>
      </div>
      <div class="pageContent">
        <div class="news" align="left">
        
        </div>
        <div class="chart">
          <h3>ETH/USDT</h3>
          <TradeViewChart
          containerStyle={{
            minHeight: '300px',
            minWidth: '400px',
            marginBottom: '30px',
          }}
          pair="ETHUSDT"
          />
        </div>
      </div>
      
      
    </div>
  );
}