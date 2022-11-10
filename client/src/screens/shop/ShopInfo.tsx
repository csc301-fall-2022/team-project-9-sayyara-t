import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

export const ShopInfo = () => {
  return (
    <Box sx={{ flexGrow: 1}}>
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Typography
                    variant="h4"
                    component="div"
                    sx={{
                        textAlign: 'left',
                        mx: 8,
                        p: 5,
                        fontWeight: "bold"
                    }}
                >
                    Shop name
                </Typography>
            </Grid>
            <Grid item xs={9}>
            <Typography
                    variant="h4"
                    component="div"
                    sx={{
                        textAlign: 'left',
                        mx: 8,
                        p: 5,
                        fontWeight: "bold"
                    }}
                >
                    Service List
                </Typography>
            </Grid>
        </Grid>
    </Box>
  );
};
