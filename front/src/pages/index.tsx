import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { keyframes } from '@emotion/react'; // Import keyframes utility from Emotion
import link from 'next/link';
import Button from '@mui/material/Button';
const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => { 
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 300);
    
    setTimeout(() => {
      setLoading(false);
      clearInterval(timer);
    }, 3200); // Display preload page for 3.2 seconds

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
        <Box sx={{ p: 4, textAlign: 'center' }}> {/* Increased padding for better spacing */}
          <Typography variant="h2" sx={{ marginBottom: 2 }}>Home Page</Typography> {/* Added margin-bottom for spacing */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 2  ,marginTop:20 }}> {/* Added margin-bottom for spacing */}
          <Button sx={{width: '30vw', height: '20vh',borderRadius:'20px' }} variant="contained" color='primary'>user</Button>
          <Button sx={{width: '30vw', height: '20vh',borderRadius:'20px' }} variant="contained" color='secondary'>admin</Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Home;