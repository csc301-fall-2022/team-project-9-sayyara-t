import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Service } from '../../interfaces';

interface ServiceInfoProps {
  service: Service
}

export const ServiceInfo = ({ service }: ServiceInfoProps) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {service.name || ""}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {`Estimated Price: ${service.price || ""}`}
        </Typography>
        <Typography variant="body2">
          {service.description || ""}
        </Typography>
      </CardContent>
    </Card>
  );
};
