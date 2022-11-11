import { createTheme } from '@mui/material/styles';
import "@fontsource/nunito";

const palette = {
  primary: {
    main: '#ff7248',
    contrastText: 'white'
  },
  secondary: {
    main: '#eeeeee'
  }
};

const typography = {
  fontFamily: "Nunito"
};

const spacing = 4;

const theme = createTheme({
  palette: palette,
  typography: typography,
  spacing: spacing
});

export default theme;

