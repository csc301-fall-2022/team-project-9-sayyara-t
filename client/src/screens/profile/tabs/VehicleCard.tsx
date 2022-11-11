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
import { useVehicleService } from '../../../services/useVehicleService';

import { Vehicle } from '../../../interfaces';
import ErrorMessages from '../../../shared/ErrorMessages';

interface VehicleCardProps {
  vehicle: Vehicle,
  setVehicle: (_vehicle: Vehicle, index: number) => void,
  removeVehicle: (index: number) => void,
  index: number
}

const VehicleCard = ({ vehicle, setVehicle, index, removeVehicle }: VehicleCardProps) => {
  const theme = useTheme();
  const vehicleService = useVehicleService();

  const [editEnabled, setEditEnabled] = useState(vehicle.vehicleId.length === 0);
  const [errorMessages, setErrorMessages] = useState([] as Array<string>);
  const [isLoading, setIsLoading] = useState(false);

  const onVehicleRemove = async () => {
    if (vehicle.vehicleId.length == 0) {
      removeVehicle(index);
      return;
    }

    setIsLoading(true);
    await vehicleService.deleteVehicle(vehicle).then(() => removeVehicle(index), 
      (error: Error) => setErrorMessages([...errorMessages, error.message]));
    setIsLoading(false);
  };

  const onVehicleSave = async (create: boolean) => {
    setIsLoading(true);
    if (create) {
      await vehicleService.createVehicle(vehicle).then((value: string) => {
        setEditEnabled(false);
        const _vehicle = {...vehicle};
        _vehicle.vehicleId = value;
        setVehicle(_vehicle, index);
      },
      (error: Error) => setErrorMessages([...errorMessages, error.message]));
    } else {
      await vehicleService.updateVehicle(vehicle).then(() => setEditEnabled(false), 
        (error: Error) => setErrorMessages([...errorMessages, error.message]));
    }
    setIsLoading(false);
  };

  return (
    <Box
      key={vehicle.vehicleId}
      marginTop={theme.spacing(4)}
      marginBottom={theme.spacing(4)}
    >
      <Card elevation={3}>
        <CardHeader
          title={`Vehicle ${index + 1}`}
          action={
            <Box>
              <Button
                onClick={() => {
                  if (editEnabled) {
                    onVehicleSave(vehicle.vehicleId.length === 0);
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
                onClick={() => onVehicleRemove()}
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
              <Typography fontWeight="bold">Model</Typography>
              <TextField 
                disabled={!editEnabled}
                value={vehicle.model || ""}
                onChange={(event) => {
                  const _vehicle = {...vehicle};
                  _vehicle.model = event.target.value;
                  setVehicle(_vehicle, index);
                }}
                fullWidth
                variant="filled"
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <Typography fontWeight="bold">Type</Typography>
              <TextField 
                disabled={!editEnabled}
                value={vehicle.type || ""}
                onChange={(event) => {
                  const _vehicle = {...vehicle};
                  _vehicle.type = event.target.value;
                  setVehicle(_vehicle, index);
                }}
                fullWidth
                variant="filled"
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <Typography fontWeight="bold">Mileage</Typography>
              <TextField 
                disabled={!editEnabled}
                value={vehicle.mileage || ""}
                onChange={(event) => {
                  const _vehicle = {...vehicle};
                  _vehicle.mileage = event.target.value;
                  setVehicle(_vehicle, index);
                }}
                fullWidth
                variant="filled"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography fontWeight="bold">Plate Number</Typography>
              <TextField 
                disabled={!editEnabled}
                value={vehicle.plate || ""}
                onChange={(event) => {
                  const _vehicle = {...vehicle};
                  _vehicle.plate = event.target.value;
                  setVehicle(_vehicle, index);
                }}
                fullWidth
                variant="filled"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography fontWeight="bold">VIN</Typography>
              <TextField 
                disabled={!editEnabled}
                value={vehicle.vin || ""}
                onChange={(event) => {
                  const _vehicle = {...vehicle};
                  _vehicle.vin = event.target.value;
                  setVehicle(_vehicle, index);
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

export default VehicleCard;