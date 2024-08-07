import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { keyframes } from '@emotion/react'; // Import keyframes utility from Emotion
import Link from 'next/link';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { TextFieldsTwoTone } from '@mui/icons-material';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => { 
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 75);
    
    setTimeout(() => {
      setLoading(false);
      clearInterval(timer);
    }, 750); // Display preload page for 0.75 seconds

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Define CSS keyframes globally
  const gradientShift = keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
      opacity: 1;
    }
  `;

  const pulsate = keyframes`
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  `;

  const fadeIn = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;

  // Animated gradient background
  const animatedBackground = {
    background: 'linear-gradient(270deg, #232D3F, #04364A, #232D3F)',
    backgroundSize: '400% 400%',
    animation: `${gradientShift} 10s ease`,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000,
    opacity: loading ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out',
  };

  // Pulsating effect for CircularProgress
  const pulsateAnimation = {
    animation: `${pulsate} 2s ease-out infinite`,
  };

  // Fade-in effect for text
  const fadeInAnimation = {
    animation: `${fadeIn} 1s ease-out forwards`, // Shorter duration for quicker fade-in
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            ...animatedBackground,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            fontSize: '2rem',
            color: '#fff',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <CircularProgress
              variant="determinate"
              value={progress}
              color="primary"
              size={120}
              thickness={4}
              sx={{
                ...pulsateAnimation,
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-60px',
                marginLeft: '-60px',
              }}
            />
            <Typography
              variant="h4"
              sx={{
                ...fadeInAnimation,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#FFDE4D',
              }}
            >{`${Math.round(progress)}%`}</Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={{ p: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, marginBottom: 2, marginTop: 20 }}>
            <Button 
            component={Link}
            href="/user"
              sx={{ 
                width: '30vw', 
                height: '25vh',
                fontSize: '1.2rem',
                borderRadius: '20px', 
                boxShadow: 3, 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s', 
                '& a': { 
                  textDecoration: 'none' 
                  },
                '&:hover': { 
                  transform: 'scale(1.05)', 
                  boxShadow: 6 
                } 
              }} 
              variant="contained" 
              color="primary"
              >
              <PersonIcon sx={{fontSize:'3rem',marginBottom:'0.5rem'}}/>
              User
            </Button>
            <Button
            component={Link} 
            href="/admin"
              sx={{ 
                width: '30vw', 
                height: '25vh', 
                fontSize: '1.2rem',
                borderRadius: '20px', 
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center', 
                transition: 'transform 0.3s, box-shadow 0.3s',
                '& a': { 
                textDecoration: 'none' 
                }, 
                '&:hover': { 
                  transform: 'scale(1.05)', 
                  boxShadow: 6 
                } 
              }} 
              variant="contained" 
              color="secondary"
            >
               <AdminPanelSettingsIcon sx={{fontSize:'3rem',marginBottom:'0.5rem'}}/>
              Admin
            </Button>
        </Box>
      </Box>
      )}
    </>
  );
};

export default Home;