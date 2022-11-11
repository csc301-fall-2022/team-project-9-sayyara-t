import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export const ServiceInfo = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Service name
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Estimate Price $$
        </Typography>
        <Typography variant="body2">
          This is a space dedicated for the description of the given service. 
        </Typography>
      </CardContent>
    </Card>
  );
};
