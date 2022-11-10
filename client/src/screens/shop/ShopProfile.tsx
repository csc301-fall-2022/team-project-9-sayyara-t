import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography
} from '@mui/material';
import { NavigationBar } from '../landing/NavigationBar';
import { ShopInfo } from './ShopInfo';

const ShopProfile = () => {
  const params = useParams();

  return (
    <>
      {/* <Typography>This is the Shop Profile for Shop {params.shopId}</Typography> */}
      <NavigationBar></NavigationBar>
      <ShopInfo></ShopInfo>
    </>
    
  );
};

export default ShopProfile;