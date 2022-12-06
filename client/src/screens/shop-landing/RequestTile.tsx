import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { Button, CardHeader, Grid, Box, Paper, Stack, TextField, CardContent, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Request, Service, Quote } from '../../interfaces';
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { styled } from '@mui/material/styles';
import { useQuoteService } from '../../services/useQuoteService';
import { useServiceService } from '../../services/useServiceService';
import { useRequestService } from '../../services/useRequestService';
import { NEW_USED, OEM_AFTER } from '../../constants';
import InfoMessage from '../../shared/InfoMessage';

/* Component usage: This is a tile (card) that represents a request sent to this owner
 * Contains:
 * - All information about the given request (service type, service name, part preference
 * state of the request)
 * - A form for the owner to fill in their quote information (labour, parts, fees, discount, total
 * and description)
 */

// All needed props for this component
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

  // const [shop, setShop] = useState({
  //   shopId: "0",
  //   name: "Unknown",
  //   address: "Unknown",
  //   phone: "Unknown",
  //   email: "Unknown",
  //   description: "Unknown"
  // } as Shop);
  
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
    // function that loads all necessary data for the page
    const loadData = async () => {
      await loadServices();

      if (request.quoteId !== null) {
        await loadQuote();
        // await loadShop();
      }
    };
    loadData();
  }, [request]);

  // function that loads the data for quote
  const loadQuote = async () => {
    await quoteService.getQuoteById(request.quoteId).then((_quote) => setQuote(_quote));
  };

  // function that loads the data for services (requests)
  const loadServices = async () => {
    const promises = request.services.map((sId) => serviceService.getServiceById(sId));
    const results = await Promise.all(promises);
    setServices(results);
  };

  // const loadShop = async () => {
  //   console.log(shopId);
  //   await shopService.getShop(shopId).then((_shop) => setShop(_shop));
  // };
  
  // function that handles the change of state in displayed requests
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
  
  // function that handles saving a filled in quote
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

  // function that gets the part preferences
  const getPartsPreferenceString = (new_used: number, oem_after: number) => {
    const new_used_str = new_used === 3 ? null : NEW_USED[new_used];
    const oem_after_str = oem_after === 3 ? null : OEM_AFTER[oem_after];

    if (!new_used_str && !oem_after_str) {
      return "No Preference";
    } else {
      return `${new_used_str ? new_used_str : ""}${oem_after_str ? ", " : ""}${oem_after_str ? oem_after_str : ""}`;
    }
  };

  const calculateTotal = (labour: number, parts: number, fees: number, discount: number) => {
    return labour + parts + fees - discount;
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
              {editEnabled && (
                <Grid item xs={12}>
                  <InfoMessage msg={"There are unsaved changes"} action={<></>}/>
                </Grid>
              )}
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
                      onChange={(event) => setQuote({
                        ...quote, 
                        labour: Number(event.target.value),
                        total: calculateTotal(Number(event.target.value), quote.parts, quote.fees, quote.discount)
                      })}
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
                      onChange={(event) => setQuote({
                        ...quote, parts: Number(event.target.value),
                        total: calculateTotal(quote.labour, Number(event.target.value), quote.fees, quote.discount)
                      })}
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
                      onChange={(event) => setQuote({
                        ...quote, 
                        fees: Number(event.target.value),
                        total: calculateTotal(quote.labour, quote.parts, Number(event.target.value), quote.discount)
                      })}
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
                      onChange={(event) => setQuote({
                        ...quote, 
                        discount: Number(event.target.value),
                        total: calculateTotal(quote.labour, quote.parts, quote.fees, Number(event.target.value))
                      })}
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
