import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopInfo } from './ShopInfo';
import TopNav from '../profile/TopNav';
import { Service, Shop } from '../../interfaces';
import { useShopService } from '../../services/useShopService';
import { useServiceService } from '../../services/useServiceService';

const ShopProfile = () => {
  const UI_WIDTH = 1600;
  const params = useParams();
  const shopService = useShopService();
  const serviceService = useServiceService();

  const [shop, setShop] = useState({} as Shop);
  const [services, setServices] = useState([] as Array<Service>);

  useEffect(() => {
    const loadData = async () => {
      const shopId = params.shopId as string;
      await shopService.getShop(shopId).then(async (_shop) => {
        await serviceService.getServicesForShop(_shop.shopId).then((_services) => {

          setShop(_shop);
          setServices(_services);
        }, (error: Error) => console.log(error.message));
      }, (error: Error) => console.log(error.message));
    };

    loadData();
  }, []);

  return (
    <>
      <TopNav height={60} uiWidth={UI_WIDTH}></TopNav>
      <ShopInfo shop={shop} services={services}></ShopInfo>
    </>
    
  );
};

export default ShopProfile;