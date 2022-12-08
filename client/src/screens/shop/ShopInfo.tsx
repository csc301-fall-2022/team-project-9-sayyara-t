import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Stack, Typography, Rating, Button, Card, CardContent, CardMedia, Alert } from '@mui/material';
import { ServiceInfo } from './ServiceInfo';
import { ShopService, Shop } from '../../interfaces';
import { useRatingService } from '../../services/useRatingService';
import {useNavigate} from "react-router-dom";
import { PATHS } from '../../constants';
import background from '../../assets/images/background.png';

/* Component usage: This is the main body of shop profile page
 * Contains:
 * - A card to display all relevant information about this shop
 * - A list of services that offered by this shop
 * - A button to request quote from this shop
 */

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// Needed props for the component
interface ShopInfoProps {
    shop: Shop,
    shopServices: Array<ShopService>
}

export const ShopInfo = ({ shop, shopServices }: ShopInfoProps) => {
    const [rating, setRating] = useState<number | null>(0);
    const [price, setPrice] = useState<number | null>(0);
    const [isEmpty, setIsEmpty] = useState(false);

    const ratingService = useRatingService();
    const navigate = useNavigate();

    const handleQuote = async () => {
        navigate(`/create-request?shopIds=${shop.shopId}`);
    };

    useEffect(() => {
        // function that loads all necessary data for this page
        const loadData = async () => {
            await ratingService.getShopRating(shop).then((_rating) => setRating(_rating));
            await ratingService.getShopPrice(shop).then((_price) => setPrice(_price));
            if (shopServices.length !== 0) {
                setIsEmpty(true);
            }
        };

        loadData();
    }, [shop]);

    // function that handles navigation for the alert
    const handleLanding = () => {
        navigate(PATHS.LANDING);
    };

    // function that renders the alert when a shop does not have any services
    const renderPopUp = () => {
        if (!isEmpty) {
            return<Grid container flexGrow={1} marginBottom={5}>
                    <Alert
                        severity='info'
                        action={
                        <Button color="inherit" size="small" onClick={handleLanding}>
                            Back to main page
                        </Button>
                        }
                        sx={{
                            flexGrow: 1
                        }}
                    >
                        This shop does not have any service
                    </Alert>
                </Grid>;
        }
    };

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
                        style={{ display: isEmpty ? "" : "none"}}
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
            <div>
                {renderPopUp()}
            </div>
            </Box>
        </Box>
    );
};
