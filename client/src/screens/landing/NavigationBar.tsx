import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useTheme, Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { PATHS, ROLES } from '../../constants';
import { AccountBox, KeyboardArrowDown, Logout, Person, RequestQuote, Storefront } from '@mui/icons-material';
import logo from '../../assets/images/logo-white.png';
import { useAuthService } from '../../services/useAuthService';

/* Component usage: This is the navigation bar for the main landing page of general users 
 * (vehicle owners) por unregistered users.
 * Contains:
 * - The search function for the main page
 * - A button to redirect to profile page (if logged in) or sign in page otherwise
 */

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
    [theme.breakpoints.up('md')]: {
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
      padding: theme.spacing(3, 3, 3, 0),
      paddingLeft: `calc(1em + ${theme.spacing(6)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('lg')]: {
        width: '60ch',
      },
    },
})); 

// Props needed for the component
interface NavigationBarProps {
  search: string,
  setSearch: (_search: string) => void
}

export const NavigationBar = ({ search, setSearch }: NavigationBarProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const authService = useAuthService();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const IMG_HEIGHT = Number(theme.mixins.toolbar.minHeight) - 15;

  // function that checks if the user is logged in or not
  const isLoggedIn = () => {
    return sessionStorage.getItem('x-access-token') !== null &&
        sessionStorage.getItem('userId') !== null &&
        sessionStorage.getItem('roleId') !== null;
  };

  // function that checks if the current user is a vehicle owner
  const isVehicleOwner = () => {
    return sessionStorage.getItem('roleId') !== null &&
      Number(sessionStorage.getItem('roleId')) === ROLES.VEHICLE_OWNER;
  };

  // function that checks if the current user is a shop owner
  const isShopOwner = () => {
    return sessionStorage.getItem('roleId') !== null &&
      Number(sessionStorage.getItem('roleId')) === ROLES.SHOP_OWNER;
  };

  // function that handles the input from search bar
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  
  // function that handles the menu button
  const handleMenuClick = (optionNum: number) => {
    navigate(`user/${sessionStorage.getItem('userId')}?menuIndex=${optionNum}`);
  };

  // function that distinguishes between logged in users and unregistered users
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoggedIn()) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate(PATHS.LOGIN);
    }
  };

  // function that enables and disables the menu button
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  // function that handles the logout feature for a logged user
  const handleLogout = () => {
    const success = authService.signOut();
    if (success) {
      navigate(PATHS.LOGIN);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
          <Toolbar>
            <Box
              marginLeft={theme.spacing(2)}
              height={theme.mixins.toolbar.minHeight}
              display="flex"
              alignItems="center"
            >
                <img height={IMG_HEIGHT} src={logo}/>
            </Box>
            <Box sx={{ flexGrow: 3 }} />
            <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search for shop"
                inputProps={{ 'aria-label': 'search' }}
                value={(search && search !== "null") ? search : ""}
                onChange={handleSearch}
            />
            </Search>
            <Box 
              flexGrow={1} 
              display="flex" 
              flexDirection="row"
              justifyContent="flex-end"
            >
            <Button 
              color='secondary' 
              size='medium' 
              sx={{ boxShadow: 0 }} 
              onClick={handleButtonClick}
              variant="contained"
              endIcon={isLoggedIn() ? <KeyboardArrowDown sx={{ color: "primary.main" }}/> : ""}
              style={{ borderRadius: 25, height: 45 }}
              startIcon={isLoggedIn() ? "" : <LoginIcon sx={{ color: "primary.main" }}/>}
            >
              {isLoggedIn() ? <Person sx={{ color: "primary.main" }}/> : <Typography color="primary.main">Login</Typography>}
            </Button>
            <Menu
              id="mouse-over-popover"
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={() => handleMenuClick(0)}>
                <ListItemIcon>
                  <AccountBox/>
                </ListItemIcon>
                <ListItemText>
                  Profile
                </ListItemText>
              </MenuItem>
              {isVehicleOwner() && <MenuItem onClick={() => handleMenuClick(1)}>
                <ListItemIcon>
                  <RequestQuote/>
                </ListItemIcon>
                <ListItemText>
                  Quotes
                </ListItemText>
              </MenuItem>}
              {isShopOwner() && <MenuItem onClick={() => handleMenuClick(1)}>
                <ListItemIcon>
                  <Storefront/>
                </ListItemIcon>
                <ListItemText>
                  Shop Management
                </ListItemText>
              </MenuItem>}
              <Divider/>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout/>
                </ListItemIcon>
                <ListItemText>
                  Logout
                </ListItemText>
              </MenuItem>
            </Menu>
            </Box>
          </Toolbar>
      </AppBar>
    </Box>
  );
};
