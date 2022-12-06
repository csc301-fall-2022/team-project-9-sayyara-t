import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopInfo } from './ShopInfo';
import { Shop, ShopService } from '../../interfaces';
import { useShopService } from '../../services/useShopService';
import { useShopServiceService } from '../../services/useShopServiceService';
import { CircularProgress } from '@mui/material';
import TopNav from '../profile/TopNav';

/* Component usage: This is the profile page for a shop in the system
 * Contains:
 * - A top navigation bar for logged in users to log out and navigate to their own
 * profile page
 * - A top card which displays all relevant information about this shop (open hours, price average,
 * description provided by the owner and rating)
 * - A list of services offered by this shop along with a request quote button
 */

const ShopProfile = () => {
  const UI_WIDTH = window.innerWidth - 50;
  
  const params = useParams();
  const shopService = useShopService();
  const shopServiceService = useShopServiceService();

  const [shop, setShop] = useState({} as Shop);
  const [shopServices, setShopServices] = useState([] as Array<ShopService>);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // function that loads all necessary data for this page
    const loadData = async () => {
      setLoading(true);
      const shopId = params.shopId as string;
      await shopService.getShop(shopId).then(async (_shop) => {
        await shopServiceService.getShopServicesForShop(_shop.shopId).then((_shopServices) => {

          setShop(_shop);
          setShopServices(_shopServices);
        }, (error: Error) => console.log(error.message));
      }, (error: Error) => console.log(error.message));
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <>
      <TopNav height={60} uiWidth={UI_WIDTH}></TopNav>
      {loading ? <CircularProgress /> : <ShopInfo shop={shop} shopServices={shopServices}></ShopInfo>}
    </>
    
  );
};

export default ShopProfile;