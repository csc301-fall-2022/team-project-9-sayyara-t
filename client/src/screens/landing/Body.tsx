import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useState } from 'react';
import { Stack } from '@mui/system';
import Slider from '@mui/material/Slider';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export const Body = () => {
    const [value, setValue] = useState('Price');
    const [price, setPrice] = useState(1);

    const marks = [
        {
          value: 6,
          label: 'Min',
        },
        {
          value: 7,
          label: '7 km',
        },
        {
          value: 8,
          label: '8 km',
        },
        {
          value: 9,
          label: '9 km',
        },
        {
            value: 10,
            label: 'Max',
        },
    ];
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleClick1 = () => {
        setPrice(1);
        console.log(price);
    };
    
    const handleClick2 = () => {
        setPrice(2);
        console.log(price);
    };

    const handleClick3 = () => {
        setPrice(3);
        console.log(price);
    };

    const handleClick4 = () => {
        setPrice(4);
        console.log(price);
    };

    function valuetext(value: number) {
        return `${value} km`;
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
        <Grid item xs={3}>
                <Typography
                    variant="h4"
                    component="div"
                    color="black"
                    sx={{
                        textAlign: 'left',
                        mx: 8,
                        p: 5,
                        fontWeight: 'bold'
                    }}
                    >
                    Filters
                </Typography>

            <FormControl
            sx={{
                textAlign: 'left',
                mx: 8,
                p: 5,
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
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel control={<Radio />} label='Price' value='Price'/>
                    <FormControlLabel control={<Radio />} label='Distance' value='Distance'/>
                    <FormControlLabel control={<Radio />} label='Ratings' value='Ratings'/>
                </RadioGroup>
            </FormControl>
            <FormControl
            sx={{
                textAlign: 'left',
                fontWeight: 'bold',
                mx: 13
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
                    Price Range
                </Typography>
                </FormLabel>
                <Stack direction='row' spacing={1}>
                    <Button variant='contained' color='secondary' sx={{ borderRadius: 8 }} onClick={handleClick1}>$</Button>
                    <Button variant='contained' color='secondary' sx={{ borderRadius: 8 }} onClick={handleClick2}>$$</Button>
                    <Button variant='contained' color='secondary' sx={{ borderRadius: 8 }} onClick={handleClick3}>$$$</Button>
                    <Button variant='contained' color='secondary' sx={{ borderRadius: 8 }} onClick={handleClick4}>$$$$</Button>
                </Stack>
            </FormControl>

            <FormControl
            sx={{
                textAlign: 'left',
                fontWeight: 'bold',
                mx: 8,
                p: 5
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
                    Distance
                </Typography>
                </FormLabel>
                <Box sx={{ width: 300 }}>
                <Slider
                    aria-label="distance-filter"
                    defaultValue={6}
                    getAriaValueText={valuetext}
                    step={1}
                    marks={marks}
                    max={10}
                    min={6}
                />
                </Box>
            </FormControl>
        </Grid>
        <Grid item xs={9}>
            <Item>xs=8</Item>
        </Grid>
        </Grid>
    </Box>
  );
};
