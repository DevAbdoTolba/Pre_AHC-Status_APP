import { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import MyAppBar from '../components/AppBar';

const theme = createTheme();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <MyAppBar />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default MyApp;
