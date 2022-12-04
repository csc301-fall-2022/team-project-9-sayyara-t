import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Stack, Button, Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants';
import { Person } from '@mui/icons-material';
import logo from '../../assets/images/logo-white.png';


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
      [theme.breakpoints.up('lg')]: {
        width: '60ch',
      },
    },
})); 


interface NavigationBarProps {
  search: string,
  setSearch: (_search: string) => void
}

export const NavigationBar = ({ search, setSearch }: NavigationBarProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const isLoggedIn = () => {
    return sessionStorage.getItem('x-access-token') !== null &&
        sessionStorage.getItem('userId') !== null &&
        sessionStorage.getItem('roleId') !== null;
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  
  const handleNavigate = () => {
    if (isLoggedIn()) {
      navigate(`/user/${sessionStorage.getItem('userId')}`);
    } else {
      navigate(PATHS.LOGIN);
    }
  };

  const checkUsers = () => {
    if (sessionStorage.getItem('roleId') === '3') {
      return PATHS.MANAGEMENT;
    } else {
      return PATHS.LANDING;
    }
  };

  return (
    <Box position="sticky" bgcolor={theme.palette.primary.main}
      sx={{
        height: 60,
        alignItems: "center",
        margin: "0 auto"
      }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between"
          }}
        >
          <Box>
            <Link to={checkUsers()}>
              <Box
                marginLeft={theme.spacing(2)}
                height={60}
                display="flex"
                alignItems="center"
              >
                  <img height={35} src={logo}/>
              </Box>
            </Link>
          </Box>
          <Stack direction="row" spacing={15}>
              <Search
                sx={{
                  height: 42
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon 
                    sx={{
                      color: '#eeeeee'
                    }}
                  ></SearchIcon>
                </SearchIconWrapper>
              <StyledInputBase
                  placeholder="Search for shop"
                  inputProps={{ 'aria-label': 'search' }}
                  value={(search && search !== "null") ? search : ""}
                  onChange={handleSearch}
                  sx={ {
                    color : '#eeeeee'
                }}
              />
              </Search>
              <Button variant="contained"
              startIcon={isLoggedIn() ? "" : <LoginIcon />}
              sx={ {
                  borderRadius: 12,
                  color : '#eeeeee'
              }}
              onClick={handleNavigate}
              >
                  {isLoggedIn() ? <Person /> : "Login"}
              </Button>
          </Stack>
        </Toolbar>
    </Box>
  );
};
