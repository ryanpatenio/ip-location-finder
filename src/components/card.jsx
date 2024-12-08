// CardComponent.js
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Map from './maps';

const CardComponent = () => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [ipaddress, setIpaddress] = useState('');
  const [error, setError] = useState('');

  const isValidIP = (ip) => {
    const cleanedIp = ip.trim();
    const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(cleanedIp);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const value = ipaddress.trim();

    if (!isValidIP(value)) {
      setError('Invalid IP address');
      setTimeout(() => {
        setError('');
        setIpaddress('');
      }, 3000);
      return;
    }

    setError('');
    fetchLocation(value);
  };

  const fetchLocation = async (ipAddress) => {
    try {
      const response = await fetch(`https://ipinfo.io/${ipAddress}/json?token=b2fedf055f925f`);
      if (response.ok) {
        const data = await response.json();
        const { loc } = data;
        const [latitude, longitude] = loc.split(',');

        setLat(latitude);
        setLong(longitude);
      } else {
        setError('Unable to fetch location');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  useEffect(() => {
    if (ipaddress) {
      fetchLocation(ipaddress);
    }
  }, [ipaddress]);

  const Content = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        my: 2,
        backgroundColor: '#fffff', // Optional: Background for visibility
      }}
    >
      <TextField
        id="outlined-basic"
        label="IP address"
        value={ipaddress}
        onChange={(e) => setIpaddress(e.target.value)}
        variant="outlined"
      />
    </Box>
  );

  return (
    <Card
      sx={{
        maxWidth: 600,
        width: '100%',
        p: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        my: 20,
        bgcolor: 'rgb(255, 255, 255)',
      }}
    >
      <CardContent>
        <Typography>Put Your IP address Here</Typography>

        {Content}
        <Typography
          sx={{ my: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            my: 2,
            flex: '1',
            overflow: 'hidden',
          }}
        >
          <Button variant="contained" onClick={handleClick}>
            Search
          </Button>
        </Box>

          <Box
          sx={{width:'100%',bgcolor:'red'}}
          
          >
            <h1>Hello</h1>

          </Box>

           {/* Only render Map when lat and long are valid */}
        {/* {lat && long ? (
          <Map lat={lat} long={long} />
        ) : (
          <Typography sx={{ textAlign: 'center', mt: 2 }}>Loading map...</Typography>
        )} */}
      </CardContent>
    </Card>

   
  );
};

export default CardComponent;
