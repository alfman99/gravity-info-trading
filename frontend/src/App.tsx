import { AppShell, Grid, Header, Slider, Text } from '@mantine/core';
import './App.css';
import { socket, WebsocketProvider } from './contexts/WebSocketContext';
import { Websocket } from './provider/Websocket';
import TradeViewChart from 'react-crypto-chart';
import { CrosshairMode, LineStyle } from 'lightweight-charts';

function App() {
  return (
    <AppShell
      padding="md"
      header={<Header height={70} p="xl">{
        <Text>Gluglu</Text>
      }</Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Grid justify="space-around" style={{ height: '88vh', overflow: 'hidden' }}>
        <Grid.Col span={'auto'} style={{ overflow: 'visible', height: '88vh' }} >
          <WebsocketProvider value={socket}>
            <Websocket/>
          </WebsocketProvider>
        </Grid.Col>
        <Grid.Col span={9}>
        <Slider
          mb={'xl'}
          showLabelOnHover={false}
          marks={[
            { value: 0, label: '😢' },
            { value: 50, label: '😐' },
            { value: 100, label: '😁' },
          ]}
          // disabled
          styles={(theme) => ({
            track: {
              backgroundColor: 'red',
              height: 20
            },
            thumb: {
              zIndex: -100
            },
            mark: {
              zIndex: -100
            },
            markLabel: {
              zIndex: -100
            },
            markLabelActive: {
              zIndex: -100
            },
            markFilled: {
              zIndex: -100
            },
            markWrapper: {
              zIndex: -100
            },
            bar: {
              backgroundColor: 'green',
            }
          })}
        />
          <TradeViewChart
              containerStyle={{
                minHeight: '80vh',
                marginTop: '20px',
              }}
              pair="ETHUSDT" interval={''} candleStickConfig={{
                upColor: "#00c176",
                downColor: "#cf304a",
                borderDownColor: "#cf304a",
                borderUpColor: "#00c176",
                wickDownColor: "#838ca1",
                wickUpColor: "#838ca1",
            }} histogramConfig={{
              base: 0,
              lineWidth: 2,
              priceFormat: {
                  type: "volume",
              },
              overlay: true,
              scaleMargins: {
                  top: 0.8,
                  bottom: 0,
              },
          }} chartLayout={{
            layout: {
                backgroundColor: "#ededed",
                textColor: "#253248",
            },
            grid: {
                vertLines: {
                color: "#838fa3",
                style: LineStyle.SparseDotted,
                },
                horzLines: {
                color: "#838fa3",
                style: LineStyle.SparseDotted,
                },
            },
            crosshair: {
                mode: CrosshairMode.Normal,
            },
            priceScale: {
                borderColor: "#485c7b",
            },
            timeScale: {
                borderColor: "#485c7b",
                timeVisible: true,
                secondsVisible: false,
            },
        }}          />
        </Grid.Col>
      </Grid>          
    </AppShell>
  );
}

export default App;
