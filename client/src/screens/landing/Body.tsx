import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useState, useEffect } from 'react';
// import { Stack } from '@mui/system';
// import Slider from '@mui/material/Slider';
import { ShopTile } from './ShopTile';
import { Shop } from '../../interfaces';
import {useNavigate} from "react-router-dom";

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

interface BodyProps {
    shops: Array<Shop>,
    sort: string
    setSort: (_price: string) => void
}

export const Body = ({ shops, sort, setSort }: BodyProps) => {
    const navigate = useNavigate();

    const [selectedShop, setSelectedShop] = useState([] as Array<string>);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSort(event.target.value);
    };

    // const handleClick = (price: number) => {
    //     setPrice(price);
    // };

    const handleQuote = async () => {
      navigate(`/create-request?shopIds=${selectedShop.join(',')}`);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Grid 
                        container
                        sx={{
                            mx: 4,
                            pt: 10,
                        }}
                        spacing={5}
                    >
                        <Grid item xs={12}>
                            <Typography
                                variant="h4"
                                component="div"
                                color="black"
                                sx={{
                                    textAlign: 'left',
                                    fontWeight: 'bold'
                                }}
                            >
                                Filters
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl
                                sx={{
                                    textAlign: 'left',
                                    fontWeight: 'bold'
                                }}
                            >
                                <FormLabel id='filter-label'>
                                    <Typography
                                        variant="h5"
                                        component="div"
                                        color="black"
                                        sx={{
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Sort
                                    </Typography>
                                </FormLabel>
                                <RadioGroup
                                    name='filter'
                                    aria-labelledby='filter-label'
                                    value={sort}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel control={<Radio />} label='Price' value='price' />
                                    <FormControlLabel control={<Radio />} label='Ratings' value='star' />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant='contained'
                                onClick={handleQuote}
                                >
                                Request a Quote
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={9}>
                    <Grid
                        container
                        spacing={10}
                        sx={{
                            itemAlign: 'center',
                            p: 10
                        }}
                    >
                        {shops.map((shop) => (
                            <Grid item width={350} key={shop.shopId}>
                                <ShopTile name={shop.name} id={shop.shopId} selectedShops={selectedShop} setSelectedShops={setSelectedShop}></ShopTile>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};
