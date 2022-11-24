import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from './sayyara_logo_transparent.png';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useAuthService } from '../../services/useAuthService';
import { User } from '../../interfaces';
import { PATHS, ROLES } from '../../constants';
import ErrorMessages from '../../shared/ErrorMessages';

const SignUp = () => {
  const authService = useAuthService();
  const navigate = useNavigate();

  const [errorMessages, setErrorMessages] = useState([] as Array<string>);
  const [isTextfieldValid, setIsTextfieldValid] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get('username') as string == "" || data.get('name') as string == "" || data.get('email') as string == ""
      || data.get('phone') as string == "" || data.get('password') as string == "" || data.get('confirm_password') as string == "") {
      setIsTextfieldValid(true);
    } else {
      const user: User = {
        username: data.get('username') as string,
        name: data.get('name') as string,
        email: data.get('email') as string,
        phone: data.get('phone') as string,
        roleId: data.get('shopOwner') ? ROLES.SHOP_OWNER : ROLES.VEHICLE_OWNER,
        userId: ""
      };

      const success = await authService.signUp(user, data.get('password') as string).then((success) => success,
        (error: Error) => setErrorMessages([...errorMessages, error.message]));

      if (success) {
        navigate(PATHS.LOGIN);
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
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {errorMessages.length > 0 && (<ErrorMessages errorMessages={errorMessages} width={0} onDismiss={() => setErrorMessages([])} />)}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                error={isTextfieldValid}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                error={isTextfieldValid}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={isTextfieldValid}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                error={isTextfieldValid}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={isTextfieldValid}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirm_password"
                label="Confirm Password"
                type="password"
                id="confirm_password"
                error={isTextfieldValid}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label="I am a Shop Owner"
                name="shopOwner"
                id="shopOwner"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;