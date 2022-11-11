import React, { useState } from 'react';
import {
  Checkbox,
  Typography
} from '@mui/material';
import { NavigationBar } from './NavigationBar';
import { Body } from './Body';
import { useShopService } from '../../services/useShopService';

const LandingPage = () => {
  const [sort, handleSort] = useState("price");
  const [search, handleSearch] = useState("null");
  const displayShops = useShopService();
  // const allShops = displayShops.getAllShops(sort, search);
  

  return (
    <>
      <NavigationBar></NavigationBar>
      <Body allShops={allShops}></Body>
    </>
  );
};

// TODO: Chat bubble can be implemented using Floating Action Button in MUI

export default LandingPage;