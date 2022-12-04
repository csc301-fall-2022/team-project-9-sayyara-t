import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import shop from '../../assets/images/shop.jpeg';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import {useNavigate} from "react-router-dom";

interface ShopTileProps {
  name: string,
  id: string,
  selectedShops: Array<string>,
  setSelectedShops: (_shopId: Array<string>) => void
}

export const ShopTile = ({ name, id, selectedShops, setSelectedShops}: ShopTileProps) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    if (selected === false) {
      setSelected(true);
      const _selected = [...selectedShops];
      _selected.push(id);
      console.log(_selected);
      setSelectedShops(_selected);
    } else {
      setSelected(false);
      const _selected = [...selectedShops];
      _selected.pop();
      console.log(_selected);
      setSelectedShops(_selected);
    }
  };

  const handleInfo = async () => {
    navigate(`shop-profile/${id}`);
  };

  return (
      <Card sx={{ width: '100%' }}>
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
        <CardActions>
          <Grid container>
            <Grid item xs={10}>
              <Button
                onClick={handleInfo}
              >
                Info
              </Button>
            </Grid>
            <Grid item>
              <Checkbox onClick={handleSelect}/>
            </Grid>
          </Grid>
          
        </CardActions>
      </Card>
  );
};
