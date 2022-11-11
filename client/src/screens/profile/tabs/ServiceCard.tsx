import React, { useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  Button,
  CardContent,
  Grid,
  Typography,
  TextField
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';

import { useTheme } from '@mui/material/styles';

import ErrorMessages from '../../../shared/ErrorMessages';
import { Service } from '../../../interfaces';
import { useServiceService } from '../../../services/useServiceService';

interface ServiceCardProps {
  service: Service,
  setService: (_service: Service, index: number) => void,
  removeService: (index: number) => void,
  index: number
}

const ServiceCard = ({ service, setService, removeService, index }: ServiceCardProps) => {
  const theme = useTheme();
  const serviceService = useServiceService();

  const [editEnabled, setEditEnabled] = useState(service.serviceId.length === 0);
  const [errorMessages, setErrorMessages] = useState([] as Array<string>);
  const [isLoading, setIsLoading] = useState(false);

  const onServiceSave = async (create: boolean) => {
    setIsLoading(true);
    if (create) {
      await serviceService.createService(service).then((value: string) => {
        setEditEnabled(false);
        const _service = {...service};
        _service.serviceId = value;
        setService(_service, index);
      },
      (error: Error) => setErrorMessages([...errorMessages, error.message]));
    } else {
      await serviceService.updateService(service).then(() => setEditEnabled(false), 
        (error: Error) => setErrorMessages([...errorMessages, error.message]));
    }
    setIsLoading(false);
  };

  const onServiceRemove = async () => {
    setIsLoading(true);
    await serviceService.deleteService(service).then(() => removeService(index), 
      (error: Error) => setErrorMessages([...errorMessages, error.message]));
    setIsLoading(false);
  };

  return (
    <Box
      key={service.serviceId}
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
                    onServiceSave(service.serviceId.length === 0);
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
                onClick={() => onServiceRemove()}
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
            <Grid item xs={6}>
              <Typography fontWeight="bold">Name</Typography>
              <TextField 
                disabled={!editEnabled}
                value={service.name || ""}
                onChange={(event) => {
                  const _service = {...service};
                  _service.name = event.target.value;
                  setService(_service, index);
                }}
                fullWidth
                variant="filled"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography fontWeight="bold">Price</Typography>
              <TextField 
                disabled={!editEnabled}
                value={service.price || 0}
                type="number"
                onChange={(event) => {
                  const _service = {...service};
                  _service.price = Number(event.target.value);
                  setService(_service, index);
                }}
                fullWidth
                variant="filled"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight="bold">Description</Typography>
              <TextField 
                disabled={!editEnabled}
                value={service.description || ""}
                onChange={(event) => {
                  const _service = {...service};
                  _service.description = event.target.value;
                  setService(_service, index);
                }}
                fullWidth
                variant="filled"
                size="small"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ServiceCard;