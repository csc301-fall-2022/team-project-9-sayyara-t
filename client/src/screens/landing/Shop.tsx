import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import shop from '../../assets/images/shop.jpeg';


export const Shop = () => {
  return (
    <Card sx={{ width: '100%' }}>
      <CardActionArea>
        <CardMedia
        //   image="/images/shop.jpeg"
          component="img"
          height="auto"
          image={shop}
          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div"
          sx={{
            fontWeight: 'bold'
          }}
          >
            Silicon Valley Auto Repairs
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            2,4 km away
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
