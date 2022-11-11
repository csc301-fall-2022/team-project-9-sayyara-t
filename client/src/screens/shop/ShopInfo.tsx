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


const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// TODO: Finish this tomorrow using the layout in Auto-layout section of Grid
// in combination with 
export const ShopInfo = () => {
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
                        Shop name
                    </Typography>
                </Item>
            </Grid>
            <Grid item xs>
                <Item>Ratings</Item>
            </Grid>
            <Grid item xs>
                <Item>Price Range</Item>
            </Grid>
            <Grid item xs>
                <Item>Open Hours</Item>
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
                <ServiceInfo></ServiceInfo>
                <ServiceInfo></ServiceInfo>
                <ServiceInfo></ServiceInfo>
            </Stack>
        </Box>
    </Box>
  );
};
