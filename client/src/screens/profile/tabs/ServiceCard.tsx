import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  Button,
  CardContent,
  Grid,
  Typography,
  TextField,
  Autocomplete
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';

import { useTheme } from '@mui/material/styles';

import ErrorMessages from '../../../shared/ErrorMessages';
import { Service, ShopService } from '../../../interfaces';
import { useShopServiceService } from '../../../services/useShopServiceService';
import { useServiceService } from '../../../services/useServiceService';

interface ServiceCardProps {
  customKey: string,
  servicesList: Array<Service>,
  shopService: ShopService,
  setShopService: (_shopService: ShopService, index: number) => void,
  removeShopService: (index: number) => void,
  index: number
}

const ServiceCard = ({ customKey, servicesList, shopService, setShopService, removeShopService, index }: ServiceCardProps) => {
  const theme = useTheme();
  const shopServiceService = useShopServiceService();
  const serviceService = useServiceService();

  const [service, setService] = useState({} as Service);
  const [servicesMap, setServicesMap] = useState({} as Record<string, Array<Service>>);
  const [selectedType, setSelectedType] = useState("");
  const [editEnabled, setEditEnabled] = useState(shopService.shopServiceId.length === 0);
  const [errorMessages, setErrorMessages] = useState([] as Array<string>);
  const [isLoading, setIsLoading] = useState(false);

  const [typeError, setTypeError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  useEffect(() => {
    const _servicesMap: Record<string, Array<Service>> = {};
    servicesList.forEach((service) => {
      if (_servicesMap[service.type]) {
        _servicesMap[service.type].push(service);
      } else {
        _servicesMap[service.type] = [service];
      }
    });
    setServicesMap(_servicesMap);
  }, [servicesList]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      if (shopService.serviceId && shopService.serviceId.length > 0) {
        await serviceService.getServiceById(shopService.serviceId).then((_service) => {
          setService(_service);
          setSelectedType(_service.type);
        }, (error: Error) => setErrorMessages([...errorMessages, error.message]));
      }
      setIsLoading(false);
    };

    loadData();
  }, [customKey]);

  const validateServiceCard = (): boolean => {
    let valid = true;
    if (!selectedType || selectedType.length === 0) {
      valid = false;
      setTypeError(true);
    }

    if (!shopService.serviceId || shopService.serviceId.length === 0) {
      valid = false;
      setNameError(true);
    }

    if (!shopService.price || shopService.price === 0) {
      valid = false;
      setPriceError(true);
    }

    if (!shopService.description || shopService.description.length === 0) {
      valid = false;
      setDescriptionError(true);
    }

    return valid;
  };

  const onServiceSave = async (create: boolean) => {
    console.log(shopService);
    if (!validateServiceCard()) {
      return;
    }
    setIsLoading(true);
    if (create) {
      await shopServiceService.createShopService(shopService).then((value: string) => {
        setEditEnabled(false);
        const _shopService = {...shopService};
        _shopService.shopServiceId = value;
        setShopService(_shopService, index);
      },
      (error: Error) => setErrorMessages([...errorMessages, error.message]));
    } else {
      await shopServiceService.updateShopService(shopService).then(() => setEditEnabled(false), 
        (error: Error) => setErrorMessages([...errorMessages, error.message]));
    }
    setIsLoading(false);
  };

  const onServiceRemove = async (create: boolean) => {
    setIsLoading(true);
    if (!create) {
      await shopServiceService.deleteShopService(shopService).then(() => removeShopService(index), 
        (error: Error) => setErrorMessages([...errorMessages, error.message]));
    } else {
      removeShopService(index);
    }
    setIsLoading(false);
  };

  return (
    <Box
      key={shopService.shopServiceId}
      marginTop={theme.spacing(4)}
      marginBottom={theme.spacing(4)}
    >
      <Card elevation={3}>
        <CardHeader
          title={`Service ${index + 1}`}
          action={
            <Box>
              <Button
                onClick={() => {
                  if (editEnabled) {
                    onServiceSave(shopService.shopServiceId.length === 0);
                  } else {
                    setEditEnabled(true);
                  }
                }}
                disabled={isLoading}
                sx={{
                  bgcolor: "secondary.main",
                  maxWidth: 25,
                  minWidth: 25,
                  maxHeight: 25,
                  minHeight: 25,
                  "&:hover": { bgcolor: "secondary.dark" },
                  marginRight: theme.spacing(2)
                }}
              >
                {editEnabled ? <SaveAsIcon/> : <EditIcon/>}
              </Button>
              <Button
                onClick={() => onServiceRemove(shopService.shopServiceId.length === 0)}
                disabled={isLoading}
                sx={{
                  bgcolor: "secondary.main",
                  maxWidth: 25,
                  minWidth: 25,
                  maxHeight: 25,
                  minHeight: 25,
                  "&:hover": { bgcolor: "secondary.dark" }
                }}
              >
                <RemoveIcon/>
              </Button>
            </Box>
          }
        />
        <CardContent>
          {errorMessages.length > 0 && <ErrorMessages errorMessages={errorMessages} width={0} onDismiss={() => setErrorMessages([])}/>}
          <Grid container spacing={theme.spacing(6)}>
            <Grid item xs={4}>
              <Typography fontWeight="bold">Type</Typography>
                <Autocomplete 
                  disabled={!editEnabled}
                  value={selectedType || null}
                  options={Object.keys(servicesMap)}
                  fullWidth
                  onChange={(event, value, reason) => {
                    setSelectedType(value as string);
                    setTypeError(false);
                  }}
                  renderInput={(params) => 
                    <TextField 
                      {...params} 
                      variant="filled" 
                      size="small" 
                      error={typeError}
                      helperText={typeError ? "Please Enter Service Type" : ""}
                    />}
                />
            </Grid>
            <Grid item xs={4}>
              <Typography fontWeight="bold">Name</Typography>
              <Autocomplete
                disabled={!editEnabled}
                value={service || null}
                noOptionsText={(!selectedType || selectedType.length == 0) ? "Please select a service type" : "No options"}
                options={servicesMap[selectedType] || []}
                getOptionLabel={(service) => service.name ? service.name : ""}
                fullWidth
                onChange={(event, value, reason) => {
                  if (reason !== "clear") {
                    const _shopService = {...shopService};
                    _shopService.serviceId = value?.serviceId as string;
                    setService(value as Service);
                    setShopService(_shopService, index);
                    setNameError(false);
                  } else {
                    setService({} as Service);
                  }
                }}
                isOptionEqualToValue={(option, value) => option.serviceId === value.serviceId}
                renderInput={(params) => 
                  <TextField 
                    {...params} 
                    variant="filled" 
                    size="small"
                    error={nameError}
                    helperText={nameError ? "Please Enter Service Name" : ""}
                  />}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography fontWeight="bold">Price</Typography>
              <TextField 
                disabled={!editEnabled}
                value={shopService.price || 0}
                type="number"
                onChange={(event) => {
                  const _shopService = {...shopService};
                  _shopService.price = Number(event.target.value);
                  setShopService(_shopService, index);
                  setPriceError(false);
                }}
                fullWidth
                variant="filled"
                size="small"
                error={priceError}
                helperText={priceError ? "Please Enter a Price Greater than 0": ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight="bold">Description</Typography>
              <TextField 
                disabled={!editEnabled}
                value={shopService.description || ""}
                onChange={(event) => {
                  const _shopService = {...shopService};
                  _shopService.description = event.target.value;
                  setShopService(_shopService, index);
                  setDescriptionError(false);
                }}
                fullWidth
                variant="filled"
                size="small"
                error={descriptionError}
                helperText={descriptionError ? "Please Enter Service Description" : ""}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ServiceCard;