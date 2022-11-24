import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, Grid, TextField, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Request, Service, Shop, Vehicle } from '../../../interfaces';
import { useServiceService } from '../../../services/useServiceService';
import { useShopService } from '../../../services/useShopService';
import { NEW_USED, OEM_AFTER } from '../../../constants';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useRequestService } from '../../../services/useRequestService';
import ErrorMessages from '../../../shared/ErrorMessages';


interface RequestCardProps {
  request: Request,
  vehicles: Vehicle[],
  onRequestRemove: (index: number) => void,
  setRequest: (_request: Request, index: number) => void,
  index: number
}

const RequestCard = ({ request, vehicles, onRequestRemove, setRequest, index }: RequestCardProps) => {
  const theme = useTheme();
  const shopService = useShopService();
  const serviceService = useServiceService();
  const requestService = useRequestService();

  const [vehicle, setVehicle] = useState({} as Vehicle);
  const [shop, setShop] = useState({} as Shop);
  const [services, setServices] = useState([] as Service[]);
  const [errorMessages, setErrorMessages] = useState([] as string[]);
  const [expanded, setExpanded] = useState(false);
  const [editEnabled, setEditEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      loadVehicle();
      await loadShop();
      await loadServices();
    };

    loadData();
  }, [request]);

  const loadServices = async () => {
    const promises = request.services.map((sId) => serviceService.getServiceById(sId).catch((error: Error) => error));
    const results = await Promise.all(promises);

    const _errorMessages: Array<string> = [];
    results.forEach((result) => {
      if (result instanceof Error) {
        _errorMessages.push(result.message);
      }
    });

    if (_errorMessages.length === 0) {
      setServices(results as Service[]);
    } else {
      setErrorMessages([...errorMessages, ..._errorMessages]);
    } 
  };

  const loadShop = async () => {
    await shopService.getShop(request.shopId).then((_shop) => setShop(_shop), 
      (error: Error) => setErrorMessages([...errorMessages, error.message]));
  };

  const loadVehicle = () => {
    const _vehicle = vehicles.find(vehicle => vehicle.vehicleId === request.vehicleId);

    if (!_vehicle) {
      setErrorMessages([...errorMessages, "Vehicle in reqest does not exist."]);
      return;
    }

    setVehicle(_vehicle);
  };

  const getPartsPreferenceString = (new_used: number, oem_after: number) => {
    const new_used_str = new_used === 3 ? null : NEW_USED[new_used];
    const oem_after_str = oem_after === 3 ? null : OEM_AFTER[oem_after];

    if (!new_used_str && !oem_after_str) {
      return "No Preference";
    } else {
      return `${new_used_str ? new_used_str : ""}${oem_after_str ? ", " : ""}${oem_after_str ? oem_after_str : ""}`;
    }
  };

  const onRequestSave = async () => {
    setIsLoading(true);
    await requestService.updateRequest(request).then(() => setEditEnabled(false), 
      (error: Error) => setErrorMessages([...errorMessages, error.message]));
    setIsLoading(false);
  };

  const onRequestDelete = async () => {
    setIsLoading(true);
    await requestService.deleteRequest(request.requestId).then(() => onRequestRemove(index),
      (error: Error) => setErrorMessages([...errorMessages, error.message]));
    setIsLoading(false);
  };

  return (
    <Accordion
      expanded={expanded}
    >
      <AccordionSummary>
        {errorMessages.length > 0 ? 
          <ErrorMessages 
            errorMessages={errorMessages} 
            width={0} 
            onDismiss={() => setErrorMessages([])}
          /> : <Box
          display="flex"
          flexDirection="column" 
          width="100%"
          paddingLeft={theme.spacing(3)}
          paddingRight={theme.spacing(3)}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography variant="h6" fontWeight="bold">{shop.name}</Typography>
            <Box>
              <Button
                onClick={() => {
                  if (editEnabled) {
                    onRequestSave();
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
                onClick={() => onRequestDelete()}
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
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            width="100%"
            marginTop={theme.spacing(3)}
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height={50}
            >
              <Typography fontWeight="bold">Vehicle</Typography>
              <Typography>{vehicle.model}</Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height={50}
            >
              <Typography fontWeight="bold">Services</Typography>
              <Box
                display="flex"
                flexDirection="row"
              >
                {services.map((service) => (<Chip key={service.serviceId} label={service.name}/>))}
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height={50}
            >
              <Typography fontWeight="bold">Parts Preference</Typography>
              <Typography>{getPartsPreferenceString(request.newUsed, request.oemAfter)}</Typography>
            </Box>
          </Box>
          <Box
            marginTop={theme.spacing(3)}
          >
            <Typography fontWeight="bold">Description</Typography>
            <TextField
                required
                multiline
                maxRows={2}
                minRows={2}
                fullWidth
                variant="filled"
                size="small"
                value={request.description || ""}
                onClick={(event) => event.stopPropagation()}
                onChange={(event) => {
                  const _request: Request = {...request, description: event.target.value};
                  setRequest(_request, index);
                }}
                disabled={!editEnabled}
              />
          </Box>
        </Box>}
      </AccordionSummary>
    </Accordion>
  );
  
};

export default RequestCard;