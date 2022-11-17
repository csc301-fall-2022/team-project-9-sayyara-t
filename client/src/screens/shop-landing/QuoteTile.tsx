import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';

export const QuoteTile = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardActionArea>
        <CardContent>
          <Grid container>
            <Grid item xs={10}>
                <Typography gutterBottom variant="h5" component="div">
                    Username of the client who requested this quote
                </Typography>
                <Typography color="text.secondary">
                    This is the description of the given quote
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography gutterBottom variant="h6" component="div">
                    Estimated Price
                </Typography>
                <Typography color="text.secondary">
                    $1000
                </Typography>
            </Grid>
          </Grid>  
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Change Estimation
        </Button>
      </CardActions>
    </Card>
  );
};
