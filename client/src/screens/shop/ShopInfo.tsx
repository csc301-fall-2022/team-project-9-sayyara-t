import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
    Box,
    Grid,
    Paper,
    Stack,
    Typography,
    Rating,
    Button
} from '@mui/material';
import { ServiceInfo } from './ServiceInfo';
import { ShopService, Shop } from '../../interfaces';
import { useRatingService } from '../../services/useRatingService';
import {useNavigate} from "react-router-dom";

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
    const [rating, setRating] = useState<number | null>(0);
    const [price, setPrice] = useState<number | null>(0);
    const ratingService = useRatingService();
    const navigate = useNavigate();

    const handleQuote = async () => {
      navigate(`/create-request?shopIds=${shop.shopId}`);
    };

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
            <Grid container>
                <Grid item xs={10}>
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
                </Grid>
                <Grid item xs={2}>
                    <Button
                        variant='contained'
                        onClick={handleQuote}
                        >
                        Request a Quote
                    </Button>
                </Grid>
            </Grid>
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
