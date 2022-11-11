import React, { useEffect, useState } from 'react';
import { 
  Box
} from '@mui/material';
import TopNav from './TopNav';
import SideNav from './SideNav';

import { useUserService } from '../../services/useUserService';
import { useVehicleService } from '../../services/useVehicleService';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import { User, Vehicle } from '../../interfaces';
import { ROLES, PROFILE_TABS } from '../../constants';
import ErrorMessages from '../../shared/ErrorMessages';
import ShopManagement from './tabs/ShopManagement';
import ProfileTab from './tabs/ProfileTab';

const UserProfile = () => {
  const params = useParams();
  const theme = useTheme();
  const userService = useUserService();
  const vehicleService = useVehicleService();

  const [user, setUser] = useState({} as User);
  const [vehicles, setVehicles] = useState([] as Array<Vehicle>);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [errorMessages, setErrorMessages] = useState([] as Array<string>);

  const UI_WIDTH = 1300;

  const [menuItems, setMenuItems] = useState([PROFILE_TABS.PROFILE]);

  useEffect(() => {
    const loadData = async () => {
      const userId: string = params.userId as string;
      const _user = await userService.getUser(userId).then(
        (_user: User) => {
          const _menuItems = [...menuItems];
          if (_user.roleId === ROLES.VEHICLE_OWNER) {
            _menuItems.push(PROFILE_TABS.QUOTES);
          } else if (_user.roleId === ROLES.SHOP_OWNER) {
            _menuItems.push(PROFILE_TABS.SHOP_MANAGEMENT);
          }
          setMenuItems(_menuItems);

          return _user;
        }, (error: Error) => {
        const _errorMessages = [...errorMessages, error.message];
        setErrorMessages(_errorMessages);

        return null;
      });

      if (_user !== null) {
        const _vehicles: Array<Vehicle> = await vehicleService.getVehiclesByUser(_user.userId).then(
          (_vehicles: Array<Vehicle>) => {
            return _vehicles;
          }, (error: Error) => {
            const _errorMessages = [...errorMessages, error.message];
            setErrorMessages(_errorMessages);

            return [];
          }
        );
        
        setVehicles(_vehicles);
        setUser(_user);
      }
    };
    
    loadData();
  }, []);

  const renderTab = () => {
    const selectedTab = menuItems[selectedIndex];

    switch (selectedTab) {
      case PROFILE_TABS.PROFILE:
        return (<ProfileTab 
          user={user} 
          setUser={setUser} 
          vehicles={vehicles} 
          setVehicles={setVehicles} 
          errorMessages={errorMessages}
          setErrorMessages={setErrorMessages}
        />);
      case PROFILE_TABS.QUOTES:
        return (<></>);
      case PROFILE_TABS.SHOP_MANAGEMENT:
        return (<ShopManagement 
          user={user}  
        />);
      default:
        return (<></>);
    }
  };  

  const onSelect = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <TopNav height={60} uiWidth={UI_WIDTH}/>
      <Box
        maxWidth={UI_WIDTH}
        paddingLeft={theme.spacing(2)}
        paddingRight={theme.spacing(2)}
        margin="0 auto"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box marginTop={theme.spacing(6)}>
          <SideNav 
            menuItems={menuItems} 
            width={200} 
            itemHeight={50} 
            selectedIndex={selectedIndex} 
            onSelect={onSelect}
          />
          </Box>
          <Box
            flex="1"
            padding={theme.spacing(4)}
            paddingRight={theme.spacing(50)}
          >
            {errorMessages.length > 0 && 
              <ErrorMessages
                errorMessages={errorMessages}
                width={0}
                onDismiss={() => setErrorMessages([])}
              />}
            {renderTab()}
        </Box> 
      </Box>
    </>
  );
};

export default UserProfile;