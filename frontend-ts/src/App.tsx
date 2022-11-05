import { AppShell, Header, Navbar } from '@mantine/core';
import './App.css';
import { socket, WebsocketProvider } from './contexts/WebSocketContext';
import { Websocket } from './provider/Websocket';

function App() {
  return (
    <AppShell
      padding="md"
      navbar={<Navbar width={{ base: '25%' }} height={'auto'} p="xs">{
        <WebsocketProvider value={socket}>
          <Websocket/>
        </WebsocketProvider>
      }</Navbar>}
      header={<Header height={70} p="xs">{

      }</Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      {/* <TradeViewChart
        containerStyle={{
          minHeight: '90vh',
          width: '1vw',
        }}
        pair="ETHUSDT" interval={'1m'} candleStickConfig={{}} histogramConfig={{}} chartLayout={{}} /> */}
    </AppShell>
  );
}

export default App;
