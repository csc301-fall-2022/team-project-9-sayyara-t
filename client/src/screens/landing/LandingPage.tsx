import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Checkbox,
  Typography
} from '@mui/material';

const LandingPage = () => {
  // Access material UI theme using this hook
  const theme = useTheme();

  // Material UI themes default components according the ThemeProvider, like the below Checkbox
  return (
    <>
      <Checkbox defaultChecked/>
      <Typography>This is the Landing Page!</Typography>
    </>
  );
};

export default LandingPage;