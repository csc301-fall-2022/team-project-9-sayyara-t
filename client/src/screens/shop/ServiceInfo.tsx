import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Service, ShopService } from '../../interfaces';
import { useServiceService } from '../../services/useServiceService';
import { LinearProgress } from '@mui/material';

/* Component usage: A tile (card) the represents a service offered by this shop
 * Contains:
 * - All related information about this service (type of service, name of the service, 
 * estimated price)
 * - dynamically rendered given a list of services for a shop
 */

interface ServiceInfoProps {
  shopService: ShopService
}

export const ServiceInfo = ({ shopService }: ServiceInfoProps) => {
  const serviceService = useServiceService();
  const [service, setService] = useState({} as Service);
  const [errorMessages, setErrorMessages] = useState([] as Array<string>);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // function that loads all necessary data for the page
    const loadData = async () => {
      setLoading(true);
      await serviceService.getServiceById(shopService.serviceId).then((_service: Service) => {
        setService(_service);
      }, (error: Error) => setErrorMessages([...errorMessages, error.message]));
      setLoading(false);
    };

    loadData();
  }, [shopService]);

  return (
    <Card sx={{ minWidth: 275 }}>
      {loading ? <CardContent>
        <LinearProgress/>
      </CardContent> : <CardContent>
        <Typography variant="h5" component="div">
          {service.name || ""}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {`Estimated Price: ${shopService.price || ""}`}
        </Typography>
        <Typography variant="body2">
          {shopService.description || ""}
        </Typography>
      </CardContent>}
    </Card>
  );
};
