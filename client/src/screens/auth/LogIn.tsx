import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import logo from './sayyara_logo_transparent.png';
import { useAuthService } from '../../services/useAuthService';
import { PATHS } from '../../constants';
import ErrorMessages from '../../shared/ErrorMessages';
import {useNavigate} from "react-router-dom";

const LogIn = () => {
    const authService = useAuthService();
    const navigate = useNavigate();

    const [errorMessages, setErrorMessages] = useState([] as Array<string>);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const success = await authService.signIn(data.get('username') as string, data.get('password') as string).then((success) => success,
        (error: Error) => setErrorMessages([...errorMessages, error.message]));

    if (success) {
        if (sessionStorage.getItem('roleId') == '3') {
            navigate(PATHS.MANAGEMENT);
        } else {
            navigate(PATHS.LANDING); 
        }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          sx={{
            height: 190,
            width: 450,
          }}
          src={logo}
        />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
            {errorMessages.length > 0 && (<ErrorMessages errorMessages={errorMessages} width={0} onDismiss={() => setErrorMessages([])} />)}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 4, mb: 3 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="reset" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LogIn;