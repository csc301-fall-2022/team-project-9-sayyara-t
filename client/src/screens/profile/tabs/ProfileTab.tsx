import React, { useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Box,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useTheme } from '@mui/material/styles';
import { useUserService } from '../../../services/useUserService';

import { User, Vehicle } from '../../../interfaces';
import { ROLES } from '../../../constants';
import VehicleCard from './VehicleCard';

interface ProfileTabProps {
  user: User
  setUser: (_user: User) => void,
  vehicles: Array<Vehicle>,
  setVehicles: (_vehicles: Array<Vehicle>) => void,
  errorMessages: Array<string>,
  setErrorMessages: (_errorMessages: Array<string>) => void
}

const ProfileTab = ({ user, setUser, vehicles, setVehicles, errorMessages, setErrorMessages }: ProfileTabProps) => {
  const theme = useTheme();
  const userService = useUserService();

  const [isUserChanged, setIsUserChanged] = useState(false);

  const updateUser = async () => {
    await userService.updateUser(user).then(() => {return;}, 
      (error: Error) => setErrorMessages([...errorMessages, error.message]));
    setIsUserChanged(false);
  };

  const onVehicleAdd = () => {
    const _vehicles = [...vehicles];
    _vehicles.push({
      vehicleId: "",
      ownerId: user.userId,
      model: "",
      type: "",
      plate: "",
      vin: "",
      mileage: ""
    } as Vehicle);

    setVehicles(_vehicles);
  };

  const onVehicleSet = (vehicle: Vehicle, index: number) => {
    const _vehicles = [...vehicles];
    _vehicles[index] = vehicle;

    setVehicles(_vehicles);
  };

  const onVehicleRemove = (index: number) => {
    const _vehicles = [...vehicles];
    _vehicles.splice(index, 1);

    setVehicles(_vehicles);
  };

  return (
    <>
      <Grid container spacing={theme.spacing(8)}>
        <Grid item xs={6}>
          <Typography fontWeight="bold">Name</Typography>
          <TextField 
            value={user.name || ""}
            onChange={(event) => {
              setIsUserChanged(true);
              setUser({...user, name: event.target.value});
            }}
            fullWidth
            variant="filled"
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography fontWeight="bold">Phone Number</Typography>
          <TextField 
            value={user.phone || ""}
            onChange={(event) => {
              setIsUserChanged(true);
              setUser({...user, phone: event.target.value});
            }}
            fullWidth
            variant="filled"
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography fontWeight="bold">Email</Typography>
          <TextField 
            value={user.email || ""}
            onChange={(event) => {
              setIsUserChanged(true);
              setUser({...user, email: event.target.value});
            }}
            fullWidth
            variant="filled"
            size="small"
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" marginTop={theme.spacing(6)}>
        <Button
          disabled={!isUserChanged}
          onClick={updateUser}
          sx={{
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
            "&:disabled": { bgcolor: "secondary.main"}
          }}
        >
          {<Typography fontWeight="bold" sx={{ color: "white" }}>Save</Typography>}
        </Button>
      </Grid>
      {(user.roleId === ROLES.VEHICLE_OWNER) && (
        <Box
          marginTop={theme.spacing(16)}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            marginBottom={theme.spacing(4)}
          >
            <Typography variant='h5' fontWeight="bold">Vehicles</Typography>
            <Button
              onClick={() => onVehicleAdd()}
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
          {vehicles.length > 0 && (vehicles.map((vehicle, index) => (
            <VehicleCard 
              key={`${vehicle.vehicleId}`} // TODO: replace key with a better option
              vehicle={vehicle} 
              setVehicle={onVehicleSet}
              removeVehicle={onVehicleRemove}
              index={index}
            />
          )))}
        </Box>
      )}
    </>
  );
};

export default ProfileTab;