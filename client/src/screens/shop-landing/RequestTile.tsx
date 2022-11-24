import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions, CardHeader, Grid, Box, Paper, Stack, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Request, Service, Quote } from '../../interfaces';
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { styled } from '@mui/material/styles';
import { useQuoteService } from '../../services/useQuoteService';
import { useServiceService } from '../../services/useServiceService';
import { useRequestService } from '../../services/useRequestService';
import { NEW_USED, OEM_AFTER } from '../../constants';

interface RequestProps {
  request: Request,
  index: number,
  setRequest: (_request: Request, index: number) => void
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const RequestTile = ({ request, index, setRequest }: RequestProps) => {
  const theme = useTheme();
  const quoteService = useQuoteService();
  const serviceService = useServiceService();
  const requestService = useRequestService();
  const [editEnabled, setEditEnabled] = useState(false);
  const [services, setServices] = useState([] as Service[]);
  const [quote, setQuote] = useState({
    fees: 0,
    discount: 0,
    total: 0,
    labour: 0,
    parts: 0,
    note: ""
  } as Quote);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await loadServices();

      if (request.quoteId !== null) {
        await loadQuote();
      }
    };
    loadData();
  }, [request]);

  const loadQuote = async () => {
    await quoteService.getQuoteById(request.quoteId).then((_quote) => setQuote(_quote));
  };

  const loadServices = async () => {
    const promises = request.services.map((sId) => serviceService.getServiceById(sId));
    const results = await Promise.all(promises);
    setServices(results);
  };
  
  const getState = (state: number): string => {
    switch(state) {
      case 1:
        return "Awaiting Response";
      case 2:
        return "Accepted";
      case 3:
        return "Cancelled";
      case 4:
        return "Expired";
      default:
        return "";
    }
  };

  const onQuoteSave = async (create: boolean) => {
    setIsLoading(true);
    if (create) {
      await quoteService.createQuote(quote).then(async (quoteId) => {
        await requestService.updateRequest({...request, quoteId: quoteId}).then(() => {
          setRequest({...request, quoteId: quoteId} as Request, index);
        });
      });
    } else {
      await quoteService.updateQuote(quote);
    }
    setEditEnabled(false);
    setIsLoading(false);
  };

  const getPartsPreferenceString = (new_used: number, oem_after: number) => {
    const new_used_str = new_used === 3 ? null : NEW_USED[new_used];
    const oem_after_str = oem_after === 3 ? null : OEM_AFTER[oem_after];

    if (!new_used_str && !oem_after_str) {
      return "No Preference";
    } else {
      return `${new_used_str ? new_used_str : ""}${oem_after_str ? ", " : ""}${oem_after_str ? oem_after_str : ""}`;
    }
  };

  return (
    <Box>
      <Card sx={{ minWidth: 250 }}>
          <CardHeader
            title={`Request ${index + 1}`}
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
                  onClick={() => {
                    if (editEnabled) {
                      onQuoteSave(request.quoteId === null);
                    } else {
                      setEditEnabled(true);
                    }
                  }}
                  disabled={isLoading}
                >
                  {editEnabled ? <SaveAsIcon/> : <EditIcon/>}
                </Button>
              </Box>
            }
          />
          <CardContent>
            <Grid container marginBottom={theme.spacing(6)} rowSpacing={theme.spacing(5)}>
              <Grid item xs={3}>
                <Typography fontWeight="bold">
                    Services
                </Typography>
                <Typography>
                  <Stack direction="row" spacing={2}>
                    {services.map((service) => (<Item key={service.serviceId}>{service.name}</Item>))}
                  </Stack>
                </Typography>
              </Grid>
              <Grid item xs={3}>
              <Typography fontWeight="bold">Parts Preference</Typography>
              <Typography>{getPartsPreferenceString(request.newUsed, request.oemAfter)}</Typography>
              </Grid>
                <Grid item xs={3}>
                    <Typography fontWeight="bold">
                      Rework
                    </Typography>
                    <Typography>
                      {request.linkedRequestId ? "Yes" : "No"}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography fontWeight="bold">
                      State
                  </Typography>
                  <Typography>
                    {getState(request.state)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography fontWeight="bold">
                  Description
                </Typography>
                <Typography>
                  {request.description}
                </Typography>
              </Grid>
              </Grid>
            <Typography variant='h5'>Quote</Typography>
            <Grid container spacing={theme.spacing(3)} marginTop={theme.spacing(1)}>
              <Grid item xs={12}>
                <Grid container spacing={theme.spacing(3)}>
                <Grid item xs={6}>
                    <Typography fontWeight="bold">
                      Labour
                    </Typography>
                    <TextField
                      disabled={!editEnabled}
                      fullWidth
                      variant="filled"
                      size="small"
                      type="number"
                      value={quote.labour}
                      onChange={(event) => setQuote({...quote, labour: Number(event.target.value)})}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography fontWeight="bold">
                      Parts
                    </Typography>
                    <TextField
                      disabled={!editEnabled}
                      fullWidth
                      variant="filled"
                      size="small"
                      type="number"
                      value={quote.parts}
                      onChange={(event) => setQuote({...quote, parts: Number(event.target.value)})}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography fontWeight="bold">
                      Fees
                    </Typography>
                    <TextField
                      disabled={!editEnabled}
                      fullWidth
                      variant="filled"
                      size="small"
                      type="number"
                      value={quote.fees}
                      onChange={(event) => setQuote({...quote, fees: Number(event.target.value)})}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography fontWeight="bold">
                      Discount
                    </Typography>
                    <TextField
                      disabled={!editEnabled}
                      fullWidth
                      variant="filled"
                      size="small"
                      type="number"
                      value={quote.discount}
                      onChange={(event) => setQuote({...quote, discount: Number(event.target.value)})}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography fontWeight="bold">
                      Total
                    </Typography>
                    <TextField
                      disabled={!editEnabled}
                      fullWidth
                      variant="filled"
                      size="small"
                      type="number"
                      value={quote.total}
                      onChange={(event) => setQuote({...quote, total: Number(event.target.value)})}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography fontWeight="bold">
                  Note for customer
                </Typography>
                <TextField
                  disabled={!editEnabled}
                  fullWidth
                  variant="filled"
                  size="small"
                  value={quote.note}
                  onChange={(event) => setQuote({...quote, note: event.target.value})}
                />
              </Grid>
            </Grid>
          </CardContent>
      </Card>
    </Box>
  );
};
