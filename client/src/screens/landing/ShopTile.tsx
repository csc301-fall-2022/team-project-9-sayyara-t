import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import { PATHS } from '../../constants';
import shop from '../../assets/images/shop.jpeg';

interface ShopTileProps {
  name: string
}

export const ShopTile = ({ name }: ShopTileProps) => {
  return (
    <Link to={PATHS.SHOP_PROFILE}>
      <Card sx={{ width: '100%' }}>
        <CardActionArea>
          <CardMedia
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
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              2,4 km away
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};
