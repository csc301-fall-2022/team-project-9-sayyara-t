import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  Typography
} from '@mui/material';
import { NavigationBar } from './NavigationBar';
import { Body } from './Body';
import { useShopService } from '../../services/useShopService';
import { Shop } from '../../interfaces';

const LandingPage = () => {
  const [sort, setSort] = useState("price");
  const [search, setSearch] = useState("null");
  const [shops, setShops] = useState([] as Array<Shop>);

  const shopService = useShopService();
  
  useEffect(() => {
    const loadData = async () => {
      const searchTerm = search.length > 0 ? search : "null";
      await shopService.getAllShops(sort, searchTerm).then((_shops) => setShops(_shops),
        (error: Error) => console.log(error.message));
    };

    loadData();
  }, [sort, search]);

  return (
    <>
      <NavigationBar search={search} setSearch={setSearch}></NavigationBar>
      <Body shops={shops} sort={sort} setSort={setSort}></Body>
    </>
  );
};

// TODO: Chat bubble can be implemented using Floating Action Button in MUI

export default LandingPage;