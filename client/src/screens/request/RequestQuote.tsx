import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useVehicleService } from '../../services/useVehicleService';
import { useShopService } from '../../services/useShopService';

import { Box, Typography, Grid, Select, TextField, Button, MenuItem, OutlinedInput, Chip, CircularProgress } from '@mui/material';
import TopNav from '../profile/TopNav';

import { PATHS, UI_WIDTH } from '../../constants';
import { Shop, Vehicle, Request, Service, ShopService } from '../../interfaces';
import ErrorMessages from '../../shared/ErrorMessages';
import { useShopServiceService } from '../../services/useShopServiceService';
import { useServiceService } from '../../services/useServiceService';
import { useRequestService } from '../../services/useRequestService';

const RequestQuote = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const shopService = useShopService();
  const vehicleService = useVehicleService();
  const shopServiceService = useShopServiceService();
  const serviceService = useServiceService();
  const requestService = useRequestService();

  const [loading, setLoading] = useState(false);
  const [shops, setShops] = useState([] as Array<Shop>);
  const [vehiclesMap, setVehiclesMap] = useState({} as Record<string, Vehicle>);
  const [errorMessages, setErrorMessages] = useState([] as Array<string>);
  const [servicesMap, setServicesMap] = useState({} as Record<string, Service>);
  const [request, setRequest] = useState({
    requestId: "",
    quoteId: "",
    linkedRequestId: "",
    userId: "",
    shopId: "",
    vehicleId: "",
    services: [],
    state: 0,
    description: "",
    newUsed: 0,
    oemAfter: 0
  } as Request);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const shopIdsParam = searchParams.get("shopIds") || "";
      if (!shopIdsParam) {
        navigate(PATHS.LANDING);
      }
      const shopIds = shopIdsParam.split(",");
      await loadShops(shopIds);

      const userId = sessionStorage.getItem("userId") || "";
      await loadVehicles(userId);

      await loadShopServices(shopIds);

      const _request = {...request, userId: userId};
      setRequest(_request);
      setLoading(false);
    };

    loadData();
  }, []);

  const loadShopServices = async (shopIds: Array<string>) => {
    const promises = shopIds.map((shopId) => shopServiceService.getShopServicesForShop(shopId).catch((error: Error) => error));
    const results = await Promise.all(promises);

    const _errorMessages: Array<string> = [];
    results.forEach((result) => {
      if (result instanceof Error) {
        _errorMessages.push(result.message);
      }
    });

    if (_errorMessages.length > 0) {
      setErrorMessages([...errorMessages, ..._errorMessages]);
      return;
    }

    const intersectingServiceIds: string[] = [];
    if (results.length === 1) {
      (results[0] as ShopService[]).forEach((_shopService) => intersectingServiceIds.push(_shopService.serviceId));
    } else {
      (results[0] as ShopService[]).forEach((_shopService) => {
        if((results as ShopService[][]).every((result) => result.some((s) => s.serviceId === _shopService.serviceId))) {
          intersectingServiceIds.push(_shopService.serviceId);
        }
      });
    }

    await loadServices(intersectingServiceIds);
  };

  const loadServices = async (serviceIds: string[]) => {
    const promises = serviceIds.map((sId) => serviceService.getServiceById(sId).catch((error: Error) => error));
    const results = await Promise.all(promises);

    const _errorMessages: Array<string> = [];
    results.forEach((result) => {
      if (result instanceof Error) {
        _errorMessages.push(result.message);
      }
    });

    if (_errorMessages.length > 0) {
      setErrorMessages([...errorMessages, ..._errorMessages]);
      return;
    }

    const _servicesMap: Record<string, Service> = {};
    (results as Service[]).forEach((s) => {
      _servicesMap[s.serviceId] = s;
    });
    setServicesMap(_servicesMap);
  };

  const loadShops = async (shopIds: Array<string>) => {
    const promises = shopIds.map((shopId) => shopService.getShop(shopId).catch((error: Error) => error));
    const results = await Promise.all(promises);

    const _errorMessages: Array<string> = [];
    results.forEach((result) => {
      if (result instanceof Error) {
        _errorMessages.push(result.message);
      }
    });

    if (_errorMessages.length === 0) {
      setShops(results as Array<Shop>);
    } else {
      setErrorMessages([...errorMessages, ..._errorMessages]);
    }
  };

  const loadVehicles = async (userId: string) => {
    await vehicleService.getVehiclesByUser(userId).then((_vehicles) => {
        if (_vehicles.length > 0) {
          const _vehiclesMap: Record<string, Vehicle> = {};
          _vehicles.forEach((v) => _vehiclesMap[v.vehicleId] = v);
          setVehiclesMap(_vehiclesMap);
        } else {
          setErrorMessages([...errorMessages, "No registered vehicles found. Please add a vehicle under your profile."]);
        }
      }, 
      (error: Error) => setErrorMessages([...errorMessages, error.message]));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const promises = shops.map((shop) => requestService.createRequest({...request, shopId: shop.shopId} as Request).catch((error: Error) => error));
    const results = await Promise.all(promises);

    const _errorMessages: Array<string> = [];
    results.forEach((result) => {
      if (result instanceof Error) {
        _errorMessages.push(result.message);
      }
    });

    if (_errorMessages.length === 0) {
      navigate(`/user/${request.userId}`);
    } else {
      setErrorMessages([...errorMessages, ..._errorMessages]);
    } 
  };

  const renderBody = () => {
    return (
      <Box>
        <Typography fontSize={16} fontWeight="bold">Selected Shops: {shops.map((shop) => shop.name).join(", ")}</Typography>
        <Box component="form" marginTop={theme.spacing(10)} onSubmit={handleSubmit}>
          <Grid container columnSpacing={theme.spacing(30)} rowSpacing={theme.spacing(5)}>
            <Grid item xs={6}>
              <Typography fontWeight="bold">Select Vehicle</Typography>
              <Select
                required
                variant="filled"
                fullWidth
                value={request.vehicleId || ""}
                renderValue={(vId) => `${vehiclesMap[vId].model} (${vehiclesMap[vId].plate})`}
                onChange={(event) => setRequest({...request, vehicleId: event.target.value})}
                size="small"
              >
                {Object.values(vehiclesMap).map((v) => (
                  <MenuItem
                    key={v.vehicleId}
                    value={v.vehicleId}
                  >
                    {`${v.model} (${v.plate})`}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <Typography fontWeight="bold">Select Service</Typography>
              <Select
                required
                variant="filled"
                fullWidth
                size="small"
                multiple
                value={request.services || []}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((serviceId, index) => (
                      <Chip 
                        key={serviceId} 
                        label={servicesMap[serviceId].name} 
                        size="small" 
                        onDelete={() => {
                          console.log(index);
                          const _services = [...request.services];
                          _services.splice(index, 1);
                          console.log(_services);
                          setRequest({...request, services: _services});
                        }}
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    ))}
                  </Box>
                )}
                onChange={(event) => {console.log(event.target.value); setRequest({...request, services: event.target.value as string[]});}}
              >
                {Object.values(servicesMap).map((service) => (
                  <MenuItem
                    key={service.serviceId}
                    value={service.serviceId}
                  >
                    {service.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} marginTop={theme.spacing(5)}>
              <Typography fontSize={18} fontWeight="bold">Part Preference</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontWeight="bold">New/Used</Typography>
              <Select
                required
                variant="filled"
                fullWidth
                size="small"
                value={request.newUsed || ""}
                onChange={(event) => setRequest({...request, newUsed: event.target.value as number})}
              >
                <MenuItem key={1} value={1}>New</MenuItem>
                <MenuItem key={2} value={2}>Used</MenuItem>
                <MenuItem key={3} value={3}>No Preference</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <Typography fontWeight="bold">OEM/Aftermarket</Typography>
              <Select
                required
                variant="filled"
                fullWidth
                size="small"
                value={request.oemAfter || ""}
                onChange={(event) => setRequest({...request, oemAfter: event.target.value as number})}
              >
                <MenuItem key={1} value={1}>OEM</MenuItem>
                <MenuItem key={2} value={2}>Aftermarket</MenuItem>
                <MenuItem key={3} value={3}>No Preference</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} marginTop={theme.spacing(5)}>
              <Typography fontWeight="bold">Description of Issue</Typography>
              <TextField
                required
                multiline
                maxRows={4}
                minRows={4}
                fullWidth
                variant="filled"
                size="small"
                value={request.description || ""}
                onChange={(event) => setRequest({...request, description: event.target.value})}
              />
            </Grid>
            <Grid container justifyContent="flex-end" marginTop={theme.spacing(6)}>
              <Button
                type="submit"
                sx={{
                  bgcolor: "primary.main",
                  "&:hover": { bgcolor: "primary.dark" },
                  "&:disabled": { bgcolor: "secondary.main"}
                }}
              >
                {<Typography fontWeight="bold" sx={{ color: "white" }}>Submit</Typography>}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <TopNav height={60} uiWidth={UI_WIDTH} />
      <Box
        maxWidth={UI_WIDTH - 400}
        paddingTop={theme.spacing(5)}
        margin="0 auto"
      >
        <Typography variant={"h5"} fontWeight="bold" marginBottom={theme.spacing(5)}>Request a Quote</Typography>
        {loading ? <Box display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box> : <>
          {errorMessages.length > 0 ? <ErrorMessages 
            errorMessages={errorMessages} 
            width={0} 
            onDismiss={() => setErrorMessages([])}
          /> : renderBody()}
        </>}
      </Box>
    </Box>
  );
};

export default RequestQuote;