import React, { useEffect, useState } from 'react';
import { Box, Tab, Tabs, Grid, Button, Typography } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { useShopService } from '../../../services/useShopService';

import { Shop, Time, User } from '../../../interfaces';
import ShopInfo from './ShopInfo';
import ErrorMessages from '../../../shared/ErrorMessages';

interface ShopManagementProps {
  user: User,
  maxWidth: number
}

const ShopManagement = ({ user, maxWidth }: ShopManagementProps) => {
  const theme = useTheme();
  const shopService = useShopService();

  const [shops, setShops] = useState([] as Array<Shop>);
  const [selectedShop, setSelectedShop] = useState(0);
  const [errorMessages, setErrorMessages] = useState([] as Array<string>);

  useEffect(() => {
    const loadData = async () => {
      await shopService.getShopsForUser(user.userId).then((_shops: Array<Shop>) => {
        setShops(_shops);
      }, (error: Error) => {
        setErrorMessages([...errorMessages, error.message]);
      });
    };

    loadData();
  }, []);

  const createShop = () => {
    const _shops = [...shops];
    _shops.push({
      shopId: "",
      name: "New Shop",
      address: "",
      phone: "",
      email: "",
      time: { start: "", end: ""} as Time,
      description: ""
    } as Shop);
    setSelectedShop(_shops.length - 1);
    setShops(_shops);
  };

  const deleteShop = async (_shop: Shop, index: number) => {
    await shopService.deleteShop(_shop.shopId).then(() => {
      const _shops = [...shops];
      _shops.splice(index, 1);
      setShops(_shops);
      if (selectedShop > 0) {
        setSelectedShop(selectedShop - 1);
      }
    }, (error: Error) => setErrorMessages([...errorMessages, error.message]));
  };

  return (
    <Box>
      <Box maxWidth={maxWidth}>
        <Grid container justifyContent="flex-end">
          <Button
            onClick={createShop}
            sx={{
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
              "&:disabled": { bgcolor: "secondary.main"}
            }}
          >
            {<Typography fontWeight="bold" sx={{ color: "white" }}>Create New Shop</Typography>}
          </Button>
        </Grid>
        <Tabs
          value={selectedShop}
          onChange={(event, newValue) => setSelectedShop(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {shops.map((shop) => (
            <Tab key={`${shop.shopId}`} label={shop.name} wrapped/> // TODO: replace key with a better option
          ))}
        </Tabs>
        <Box marginTop={theme.spacing(4)}>
          {errorMessages.length > 0 && <ErrorMessages errorMessages={errorMessages} width={0} onDismiss={() => setErrorMessages([])}/>}
          {shops.length > 0 && <ShopInfo 
            user={user}
            shop={shops[selectedShop]} 
            index={selectedShop}
            setShop={(_shop, index) => {
              const _shops = [...shops];
              _shops[index] = _shop;
              setShops(_shops);
            }}
            errorMessages={errorMessages}
            setErrorMessages={setErrorMessages}
            onDeleteShop={deleteShop}
          />}
        </Box>
      </Box>
    </Box>
  );
};

export default ShopManagement;