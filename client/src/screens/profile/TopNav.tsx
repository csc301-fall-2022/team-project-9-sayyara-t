import React, {useState} from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";

import { PATHS } from '../../constants';

import logo from '../../assets/images/logo-white.png';
import LogoutIcon from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';
import { useAuthService } from '../../services/useAuthService';

interface TopNavProps {
  height: number,
  uiWidth: number
}

const TopNav = ({ height, uiWidth }: TopNavProps) => {
  const theme = useTheme();
  const authService = useAuthService();
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState([] as Array<string>);

  const IMG_HEIGHT = height - 25;

  const isLoggedIn = () => {
    return sessionStorage.getItem('x-access-token') !== null && 
          sessionStorage.getItem('userId') !== null &&
          sessionStorage.getItem('roleId') !== null;
  };

  const handleSignOut = async () => {
    const success = await authService.signOut();
    if (success) {
        navigate(PATHS.LANDING);
    }
  };

  const getLink = () => {
    if (isLoggedIn()) {
      return `/user/${sessionStorage.getItem('userId')}`;
    }
    return PATHS.LANDING;
  };

  const checkOwners = () => {
    if (sessionStorage.getItem('roleId') == '3') {
      return PATHS.MANAGEMENT;
    } else {
      return PATHS.LANDING;
    }
  };

  return (
    <Box height={height} bgcolor={theme.palette.primary.main}>
      <Box 
        maxWidth={uiWidth}
        margin="0 auto"
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          height={height}
        >
          <Link to={checkOwners()}>
            <Box
              marginLeft={theme.spacing(2)}
              height={height}
              display="flex"
              alignItems="center"
            >
                <img height={IMG_HEIGHT} src={logo}/>
            </Box>
          </Link>
          <Box 
            display="flex"
            marginRight={theme.spacing(2)}
            justifyContent="space-between"
            flexDirection="row"
          >
            <Grid container spacing={8}>
              <Grid item>
                <Button 
                  variant="contained"
                  startIcon={<LogoutIcon />}
                  sx={ {
                      borderRadius: 8,
                      color : '#eeeeee'
                  }}
                  style={{ display: isLoggedIn() ? "" : "none" }}
                  onClick={handleSignOut}
                  >
                      {"Log out"}
                </Button>
              </Grid>
              <Grid item>
                <Link to={getLink()}>
                  <Avatar sizes="20" sx={{ bgcolor: "secondary.main", padding: 0 }}>
                    <Person sx={{ color: "primary.main" }}/>
                  </Avatar>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TopNav;