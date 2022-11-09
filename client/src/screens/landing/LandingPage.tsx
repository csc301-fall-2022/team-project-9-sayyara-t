import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Checkbox,
  Typography
} from '@mui/material';
import { NavigationBar } from './NavigationBar';
import { Body } from './Body';

const LandingPage = () => {
  // Access material UI theme using this hook
  const theme = useTheme();

  // Material UI themes default components according the ThemeProvider, like the below Checkbox
  return (
    <>
      <NavigationBar></NavigationBar>
      {/* <Checkbox defaultChecked/>
      <Typography>Filter</Typography> */}
      <Body></Body>
    </>
  );
};

export default LandingPage;