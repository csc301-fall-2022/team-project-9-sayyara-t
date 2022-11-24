import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Typography, Button, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useTheme } from '@mui/material/styles';
import { useShopService } from '../../../services/useShopService';

import { ShopService, Shop, User, Service } from '../../../interfaces';
import ServiceCard from './ServiceCard';
import { useShopServiceService } from '../../../services/useShopServiceService';
import { useShopAdminServices } from '../../../services/useShopAdminServices';
import { useServiceService } from '../../../services/useServiceService';

interface ShopInfoProps {
  user: User,
  shop: Shop,
  index: number,
  setShop: (_shop: Shop, index: number) => void,
  errorMessages: Array<string>,
  setErrorMessages: (_errorMessages: Array<string>) => void
}

const ShopInfo = ({ user, shop, index, setShop, errorMessages, setErrorMessages }: ShopInfoProps) => {
  const theme = useTheme();
  const shopService = useShopService();
  const shopServiceService = useShopServiceService();
  const shopAdminService = useShopAdminServices();
  const serviceService = useServiceService();

  const [loading, setLoading] = useState(false);
  const [shopServices, setShopServices] = useState([] as Array<ShopService>);
  const [isShopChanged, setIsShopChanged] = useState(false);
  const [servicesList, setServicesList] = useState([] as Array<Service>);

  useEffect(() => {
    const loadData = async () => {
      await serviceService.getAllServices().then((_services) => setServicesList(_services),
        (error: Error) => setErrorMessages([...errorMessages, error.message]));
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      if (shop.shopId.length == 0) {
        setShopServices([]);
        return;
      }
      await shopServiceService.getShopServicesForShop(shop.shopId).then((_shopServices) => setShopServices(_shopServices), 
        (error: Error) => setErrorMessages([...errorMessages, error.message]));
      setLoading(false);
    };

    loadData();
  }, [shop]);

  const onShopServiceAdd = () => {
    const _shopServices = [...shopServices];
    _shopServices.push({
      shopId: shop.shopId,
      shopServiceId: "",
      serviceId: "",
      description: "",
      price: 0
    } as ShopService);
    setShopServices(_shopServices);
  };

  const onShopServiceSet = (shopService: ShopService, index: number) => {
    const _shopServices = [...shopServices];
    _shopServices[index] = shopService;
    setShopServices(_shopServices);
  };

  const onShopServiceRemove = (index: number) => {
    const _shopServices = [...shopServices];
    _shopServices.splice(index, 1);
    setShopServices(_shopServices);
  };

  const updateShop = async () => {
    await shopService.updateShop(shop).then(() => {return;}, 
      (error: Error) => setErrorMessages([...errorMessages, error.message]));
    setIsShopChanged(false);
  };

  const createShop = async () => {
    await shopService.createShop(shop).then(async (_shopId: string) => {
      await shopAdminService.createShopAdmin(user.userId, _shopId).then(() => setShop({...shop, shopId: _shopId}, index),
        (error: Error) => setErrorMessages([...errorMessages, error.message]));
    }, (error: Error) => setErrorMessages([...errorMessages, error.message]));
    setIsShopChanged(false);
  };

  return (
    <Box
      marginTop={theme.spacing(4)}
    >
      {loading ? <CircularProgress /> : 
      <Box>
        <Grid container spacing={theme.spacing(8)}>
          <Grid item xs={6}>
            <Typography fontWeight="bold">Name</Typography>
            <TextField 
              value={shop.name || ""}
              onChange={(event) => {
                setIsShopChanged(true);
                setShop({...shop, name: event.target.value}, index);
              }}
              fullWidth
              variant="filled"
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography fontWeight="bold">Address</Typography>
            <TextField 
              value={shop.address || ""}
              onChange={(event) => {
                setIsShopChanged(true);
                setShop({...shop, address: event.target.value}, index);
              }}
              fullWidth
              variant="filled"
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography fontWeight="bold">Phone</Typography>
            <TextField 
              value={shop.phone || ""}
              onChange={(event) => {
                setIsShopChanged(true);
                setShop({...shop, phone: event.target.value}, index);
              }}
              fullWidth
              variant="filled"
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography fontWeight="bold">Email</Typography>
            <TextField 
              value={shop.email || ""}
              onChange={(event) => {
                setIsShopChanged(true);
                setShop({...shop, email: event.target.value}, index);
              }}
              fullWidth
              variant="filled"
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography fontWeight="bold">Opening Time</Typography>
            <TextField 
              value={shop.time.start || ""}
              onChange={(event) => {
                setIsShopChanged(true);
                setShop({...shop, time: {...shop.time, start: event.target.value}}, index);
              }}
              fullWidth
              variant="filled"
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography fontWeight="bold">Closing Time</Typography>
            <TextField 
              value={shop.time.end || ""}
              onChange={(event) => {
                setIsShopChanged(true);
                setShop({...shop, time: {...shop.time, end: event.target.value}}, index);
              }}
              fullWidth
              variant="filled"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight="bold">Description</Typography>
            <TextField 
              value={shop.description || ""}
              onChange={(event) => {
                setIsShopChanged(true);
                setShop({...shop, description: event.target.value}, index);
              }}
              fullWidth
              variant="filled"
              size="small"
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" marginTop={theme.spacing(6)}>
          <Button
            disabled={!isShopChanged}
            onClick={shop.shopId.length > 0 ? updateShop : createShop}
            sx={{
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
              "&:disabled": { bgcolor: "secondary.main"}
            }}
          >
            {<Typography fontWeight="bold" sx={{ color: "white" }}>Save</Typography>}
          </Button>
        </Grid>
        {(
          <Box
            marginTop={theme.spacing(16)}
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              marginBottom={theme.spacing(4)}
            >
              <Typography variant='h5' fontWeight="bold">Services</Typography>
              <Button
                onClick={() => onShopServiceAdd()}
                sx={{
                  bgcolor: "primary.main",
                  maxWidth: 25,
                  minWidth: 25,
                  maxHeight: 25,
                  minHeight: 25,
                  "&:hover": { bgcolor: "primary.dark" }
                }}
              >
                <AddIcon sx={{ color: "white", margin: 0, padding: 0 }}/>
              </Button>
            </Box>
            {(shopServices.length > 0) && (shopServices.map((_shopService, index) => (
              <ServiceCard 
                key={`${_shopService.shopServiceId}`} // TODO: replace key with a better option
                customKey={`${_shopService.shopServiceId}`}
                shopService={_shopService} 
                servicesList={servicesList}
                setShopService={onShopServiceSet}
                removeShopService={onShopServiceRemove}
                index={index}
              />
            )))}
          </Box>
        )}
      </Box>}
    </Box>
  );
};

export default ShopInfo;