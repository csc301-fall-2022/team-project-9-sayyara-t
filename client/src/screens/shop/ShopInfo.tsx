import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
    Box,
    Grid,
    Paper,
    Stack,
    Typography,
    Rating
} from '@mui/material';
import { ServiceInfo } from './ServiceInfo';
import { Service, Shop } from '../../interfaces';
import { useRatingService } from '../../services/useRatingService';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

interface ShopInfoProps {
    shop: Shop,
    services: Array<Service>
}

// TODO: Finish this tomorrow using the layout in Auto-layout section of Grid
// in combination with 
export const ShopInfo = ({ shop, services }: ShopInfoProps) => {
    const [rating, setRating] = useState<number | null>(0);
    const [price, setPrice] = useState<number | null>(0);
    const ratingService = useRatingService();
    useEffect(() => {
        const loadData = async () => {
            await ratingService.getShopRating(shop).then((_rating) => setRating(_rating));
            await ratingService.getShopPrice(shop).then((_price) => setPrice(_price));
        };

        loadData();
    }, [shop]);


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
                        <Item>
                            <Rating name="shop-rating" value={rating} precision={0.5} readOnly />
                        </Item>
                    </Grid>
                    <Grid item xs>
                        <Item>Price Range: ${price}</Item>
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
                    {services.length > 0 && services.map((service) => (
                        <ServiceInfo
                            key={service.serviceId}
                            service={service}
                        />
                    ))}
                </Stack>
            </Box>
        </Box>
    );
};
