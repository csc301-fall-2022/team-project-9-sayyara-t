import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography
} from '@mui/material';

const ShopProfile = () => {
  const params = useParams();

  return (
    <Typography>This is the Shop Profile for Shop {params.shopId}</Typography>
  );
};

export default ShopProfile;