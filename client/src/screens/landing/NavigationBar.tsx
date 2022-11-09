import React from 'react';
import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LoginIcon from '@mui/icons-material/Login';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(3, 3),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(6)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '80ch',
      },
    },
}));

export const NavigationBar = () => {
  return (
    <AppBar position="static">
        <Toolbar>
            <Typography
              variant="h3"
              noWrap
              component="div"
              color="secondary"
              sx={{ 
                display: { xs: 'none', sm: 'block' },
                flexGrow: 1
            }}
            >
              Sayyara.
            </Typography>
            <Stack direction="row" spacing={15}>
                <Button variant="contained"
                sx={ {
                    borderRadius: 8,
                    color : '#eeeeee'
                }}
                >
                    <LocationOnIcon></LocationOnIcon>
                    Location
                </Button>
                <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search for shop"
                    inputProps={{ 'aria-label': 'search' }}
                />
                </Search>
                <Button variant="contained" 
                sx={ {
                    borderRadius: 8,
                    color : '#eeeeee'
                }}
                >
                    <LoginIcon></LoginIcon>
                    Login
                </Button>
            </Stack>
        </Toolbar>
    </AppBar>
  );
};
