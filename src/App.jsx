import { Container } from '@mui/material';
import Header from './components/Header'; 
import Card from './components/card';   
import 'leaflet/dist/leaflet.css';  

function App() {
  return (
    <Container
    maxWidth={false} // Full width container
    component="main"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      alignItems: 'center',
      bgcolor:'rgb(250, 248, 248)'
   
   
      }}
    >
      <Header />
      <Card />
    </Container>
  );
}

export default App;
