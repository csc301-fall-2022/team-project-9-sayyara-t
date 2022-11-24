import React from 'react';
import { styled } from '@mui/material/styles';
import { 
    Box,
    Grid,
    Paper,
    Stack,
    Typography
} from '@mui/material';
import { ServiceInfo } from './ServiceInfo';
import { Service, Shop, ShopService } from '../../interfaces';


const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

interface ShopInfoProps {
    shop: Shop,
    shopServices: Array<ShopService>
}

// TODO: Finish this tomorrow using the layout in Auto-layout section of Grid
// in combination with 
export const ShopInfo = ({ shop, shopServices }: ShopInfoProps) => {
  return (
    <Box>
        <Box 
            sx={{ 
                flexGrow: 1,
                py: 5,
                px: 20
            }}
        >
        <Grid container spacing={3}>
            <Grid item xs>
                <Item>
                <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            fontWeight: "bold"
                        }}
                    >
                        {shop.name}
                    </Typography>
                </Item>
            </Grid>
            <Grid item xs>
                <Item>Rating: N/A</Item>
            </Grid>
            <Grid item xs>
                <Item>Price Range: </Item>
            </Grid>
            <Grid item xs>
                <Item>{`Open Hours: ${shop.time ? shop.time.start : ""}-${shop.time ? shop.time.end : ""}`}</Item>
            </Grid>
        </Grid>
        </Box>
        <Typography
            variant="h4"
            component="div"
            sx={{
                textAlign: 'left',
                mx: 20,
                fontWeight: "bold",
                flexGrow: 1
            }}
        >
            Service List
        </Typography>
        <Box 
            sx={{ 
                flexGrow: 1,
                py: 5,
                px: 20
            }}
        >
            <Stack spacing={5} direction="column">
                {shopServices.length > 0 && shopServices.map((shopService) => (
                    <ServiceInfo 
                        key={shopService.serviceId}
                        shopService={shopService}
                    />
                ))}
            </Stack>
        </Box>
    </Box>
  );
};
