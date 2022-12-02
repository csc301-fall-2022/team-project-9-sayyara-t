import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
    Box,
    Grid,
    Paper,
    Stack,
    Typography,
    Rating,
    Button,
    Card,
    CardContent,
    CardMedia,
    CardActionArea
} from '@mui/material';
import { ServiceInfo } from './ServiceInfo';
import { ShopService, Shop } from '../../interfaces';
import { useRatingService } from '../../services/useRatingService';
import {useNavigate} from "react-router-dom";
import background from '../../assets/images/background.png';

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
                <Card>
                    <CardMedia
                    component="img"
                    height="200"
                    image={background}
                    />
                    <CardContent>
                        <Grid container spacing={5}>
                            <Grid item xs={11}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {shop.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {shop.description}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Box>
                                    <Rating name="shop-rating" value={rating} precision={0.5} readOnly />
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>{`Open Hours: ${shop.time ? shop.time.start : ""}-${shop.time ? shop.time.end : ""}`}</Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>Price Average: {isNaN(Number(price)) ? "Unknown" : `$${price}`}</Item>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                {/* <Card>
                    <CardMedia
                    component="img"
                    height="140"
                    image={background}
                    />
                    <CardContent>
                        <Grid container spacing={5}>
                            <Grid item xs={10}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {shop.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {shop.description}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Grid container direction='column' spacing={2}>
                                    <Grid item xs={6}>
                                        <Item>
                                            <Rating name="shop-rating" value={rating} precision={0.5} readOnly />
                                        </Item>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Item>Average Price: {isNaN(Number(price)) ? "Unknown" : `$${price}`}</Item>
                                    </Grid>
                                </Grid>
                                
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>{`Open Hours: ${shop.time ? shop.time.start : ""}-${shop.time ? shop.time.end : ""}`}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card> */}
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
