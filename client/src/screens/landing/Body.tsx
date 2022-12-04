import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Typography, Alert } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useState } from 'react';
import { ShopTile } from './ShopTile';
import { Shop } from '../../interfaces';
import {useNavigate} from "react-router-dom";


interface BodyProps {
    shops: Array<Shop>,
    sort: string
    setSort: (_price: string) => void
}

export const Body = ({ shops, sort, setSort }: BodyProps) => {
    const navigate = useNavigate();

    const [selectedShop, setSelectedShop] = useState([] as Array<string>);
    const [isSelected, setIsSelected] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSort(event.target.value);
    };

    const handleQuote = async () => {
        if (selectedShop.length === 0) {
            setIsSelected(true);
        } else {
            navigate(`/create-request?shopIds=${selectedShop.join(',')}`);
        }
    };

    const renderPopUp = () => {
        if (isSelected) {
            return<Grid container flexGrow={1} marginBottom={5}>
                    <Alert
                        severity='error'
                        sx={{
                            flexGrow: 1
                        }}
                    >
                        Please select a shop first
                    </Alert>
                </Grid>;
        }
    };

    return (
        // <Box sx={{ flexGrow: 1 }} maxWidth={UI_WIDTH} margin="0 auto">
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
                                Sort
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
                            <Grid container>
                                <Grid item xs={12}>
                                    <Button
                                        variant='contained'
                                        onClick={handleQuote}
                                        >
                                        Request a Quote
                                    </Button>
                                <Grid item xs={6}>
                                    <Box
                                        sx={{
                                            pt: 5
                                        }}
                                    >
                                        {renderPopUp()}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
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
