import React from 'react';
import { styled } from '@mui/material/styles';
import { 
    Box,
    Grid,
    Paper,
    Stack,
    Typography
} from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// TODO: Finish this tomorrow using the layout in Auto-layout section of Grid
// in combination with 
export const ShopInfo = () => {
  return (
    // <Box sx={{ flexGrow: 1}}>
    //     <Grid container spacing={2}>
    //         <Grid item xs={3}>
    //             <Stack direction="column">
    //                 <Typography
    //                     variant="h4"
    //                     component="div"
    //                     sx={{
    //                         textAlign: 'left',
    //                         mx: 8,
    //                         p: 5,
    //                         fontWeight: "bold"
    //                     }}
    //                 >
    //                     Shop name
    //                 </Typography>
    //                 <Typography
    //                     variant="h6"
    //                     component="div"
    //                     sx={{
    //                         textAlign: 'left',
    //                         mx: 13
    //                     }}
    //                 >
    //                     Address:
    //                 </Typography>
    //             </Stack>
    //         </Grid>
    //         <Grid item xs={9}>
    //         <Typography
    //                 variant="h4"
    //                 component="div"
    //                 sx={{
    //                     textAlign: 'left',
    //                     mx: 8,
    //                     p: 5,
    //                     fontWeight: "bold"
    //                 }}
    //             >
    //                 Service List
    //             </Typography>
    //         </Grid>
    //     </Grid>
    // </Box>
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
            <Item>Shop Name</Item>
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
        <Typography>hello</Typography>
    </Box>
  );
};
