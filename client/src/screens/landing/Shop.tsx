import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


export const Shop = () => {
  return (
    <Card sx={{ width: '100%' }}>
      <CardActionArea>
        <CardMedia
        //   image="/images/shop.jpeg"
          component="img"
          height="auto"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSarTU3CAPmCKRJKcbYsRI2vxWDFqghrPHbg&usqp=CAU"
          
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
