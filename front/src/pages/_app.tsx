import { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { teal, pink } from '@mui/material/colors';
import '../styles/globals.css'; // Ensure you have a globals.css file

// Define a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: pink[500],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 20,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: teal[100],
          color: teal[900],
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style jsx global>{`
        body {
          background-color: #e0f7fa; // Light teal color
        }
      `}</style>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
