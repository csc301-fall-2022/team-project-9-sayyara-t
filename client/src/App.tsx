import React from 'react';
import theme from './style/theme';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Router>
          <AppRoutes />
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
