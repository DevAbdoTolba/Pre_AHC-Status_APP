// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

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
    }, 3000); // Display preload page for 3 seconds

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Animated gradient background
const animatedBackground = {
  '@keyframes gradientShift': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%', opacity: 1 },
  },
  background: 'linear-gradient(270deg, #232D3F, #04364A, #232D3F)',
  backgroundSize: '400% 400%',
  animation: 'gradientShift 10s ease',
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
  '@keyframes pulsate': {
    '0%': {
      transform: 'scale(1)',
      opacity: 1,
    },
    '50%': {
      transform: 'scale(1.1)',
      opacity: 0.7,
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
  animation: 'pulsate 2s ease-out infinite',
};
// Fade-in effect for text
const fadeInAnimation = {
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  animation: 'fadeIn 2s ease-out forwards',
};

  return (
    <>

      {loading ? (
        <Box
          sx={{
            ...animatedBackground,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            fontSize: '2rem',
            zIndex: 1000,
            opacity: 1,
            transition: 'opacity 0.5s ease-in-out',
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
                transition: 'opacity 0.5s ease-in-out',
              }}
            >{`${Math.round(progress)}%`}</Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={{ p: 2 }}>
          <Typography variant="h2">Home Page</Typography>
          <p>Index</p>
        </Box>
      )}

    </>
  );
};

export default Home;
