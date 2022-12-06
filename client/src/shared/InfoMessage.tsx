import React, { ReactNode } from 'react';
import { Alert, Grid } from '@mui/material';

interface InfoMessageProps {
  msg: string,
  action: ReactNode
}

const InfoMessage = ({msg, action}: InfoMessageProps) => {

  return (
    <Grid container flexGrow={1} marginBottom={1}>
      <Alert
        severity='info'
        action={action}
        sx={{
            flexGrow: 1
        }}
      >
        {msg}
      </Alert>
    </Grid>
  );
};

export default InfoMessage;