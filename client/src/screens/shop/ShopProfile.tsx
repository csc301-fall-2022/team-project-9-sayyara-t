import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography
} from '@mui/material';
import { NavigationBar } from '../landing/NavigationBar';
import { ShopInfo } from './ShopInfo';
import TopNav from '../profile/TopNav';

const ShopProfile = () => {
  const params = useParams();
  const UI_WIDTH = 1300;

  return (
    <>
      {/* <Typography>This is the Shop Profile for Shop {params.shopId}</Typography> */}
      {/* <NavigationBar></NavigationBar> */}
      <TopNav height={60} uiWidth={UI_WIDTH}></TopNav>
      <ShopInfo></ShopInfo>
    </>
    
  );
};

export default ShopProfile;