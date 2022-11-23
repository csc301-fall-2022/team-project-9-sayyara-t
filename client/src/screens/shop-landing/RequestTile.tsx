import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions, CardHeader, Grid, Box, Paper, Stack, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Request } from '../../interfaces';
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { styled } from '@mui/material/styles';

// interface RequestProps {
//   request: Request
// }

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const RequestTile = () => {
  const theme = useTheme();
  // const [editEnabled, setEditEnabled] = useState(request.requestId.length === 0);

  return (
    <Card sx={{ minWidth: 250 }}>
        <CardHeader
          title={'UserID'}
          action={
            <Box>
              <Button
                sx={{
                  bgcolor: "secondary.main",
                  maxWidth: 35,
                  minWidth: 35,
                  maxHeight: 35,
                  minHeight: 35,
                  "&:hover": { bgcolor: "secondary.dark" },
                  marginRight: theme.spacing(2)
                }}
              >
                {<EditIcon/>}
              </Button>
            </Box>
          }
        />
        <CardContent>
          <Grid container>
            <Grid item xs={3}>
              <Typography fontWeight="bold">
                Description
              </Typography>
              <Typography>
                Given description from the user about the request
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography fontWeight="bold">
                  Services
              </Typography>
              <Typography>
                <Stack direction="row" spacing={2}>
                  <Item>Service 1</Item>
                  <Item>Service 2</Item>
                  <Item>Service 3</Item>
                </Stack>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography fontWeight="bold">
                  State
              </Typography>
              <Typography>
                Status of the request
              </Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography fontWeight="bold">
                  Linked request
                </Typography>
                <Typography>
                  The previous linked request
                </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={theme.spacing(3)}>
            <Grid item xs={12}>
              <Grid container spacing={theme.spacing(3)}>
                <Grid item xs={4}>
                  <Typography fontWeight="bold">
                    Fee
                  </Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    size="small"
                    type="number"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography fontWeight="bold">
                    Discount
                  </Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    size="small"
                    type="number"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography fontWeight="bold">
                    Total
                  </Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    size="small"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight="bold">
                Note for customer
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                size="small"
              />
            </Grid>
          </Grid>
        </CardContent>
    </Card>
  );
};
