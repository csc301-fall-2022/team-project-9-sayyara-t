import React, { useEffect, useState } from 'react';
import { Shop, Request } from '../../interfaces';
import { RequestTile } from './RequestTile';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Box, Grid, Stack, Typography, Paper, InputBase, Button } from '@mui/material';
import { User } from '../../interfaces';
import { useShopService } from '../../services/useShopService';
import { useRequestService } from '../../services/useRequestService';
import { STATE, UI_WIDTH } from '../../constants';

interface ShopQuotesListProps {
    searchService: string
    setSearchService: (_search: string) => void
    searchCustomer: string
    setSearchCustomer: (_search: string) => void
    // filter: date, state, service type, rework/non-rework
    state: number
    setState: (_state: number) => void
    rework: number
    setRework: (_rework: number) => void
    user: User
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(3, 3),
        paddingLeft: `calc(1em + ${theme.spacing(6)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
        width: '20ch',
        },
    },
}));

export const ShopQuotesList = ({ searchService, 
    setSearchService, searchCustomer, setSearchCustomer, state, setState, rework, setRework, user }: ShopQuotesListProps) => {
    const theme = useTheme();
    const shopService = useShopService();
    const requestService = useRequestService();

    const [shops, setShops] = useState([] as Array<Shop>);
    const [requests, setRequests] = useState([] as Array<Request>);

    const handleSearchService = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchService(event.target.value);
    };

    const handleSearchCustomer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCustomer(event.target.value);
    };

    const handleState = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(Number(event.target.value));
    };

    const handleRework = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRework(Number(event.target.value));
    };

    const applyFilters = async () => {
        await shopService.getShopsForUser(user.userId).then( async (_shops: Array<Shop>) => {
            setShops(_shops);
            const results = await Promise.all(_shops.map((_shop) => requestService.getSelectedRequest(
                _shop.shopId,
                searchService,
                searchCustomer,
                state,
                rework
            )));
            console.log(results);
            setRequests(results.flat());
          });
    };

    useEffect(() => {
      const loadData = async () => {
        await shopService.getShopsForUser(user.userId).then( async (_shops: Array<Shop>) => {
          setShops(_shops);
          const results = await Promise.all(_shops.map((_shop) => requestService.getRequestByShop(_shop.shopId)));
          const _requests = results.flat();
          const _filteredRequests = _requests.filter((_request) => _request.state === STATE.AWAITING || _request.state === STATE.ACCEPTED);
          setRequests(_filteredRequests);
        });
      };
      
      loadData();
    }, [user]);

    const setRequest = async (_request: Request, index: number) => {
        const _requests = [...requests];
        _requests[index] = _request;
        setRequests(_requests);
    };

  return (
    <Box>
        <Grid container width={UI_WIDTH} margin="auto">
            {/* <Grid item xs={2}>
                <Stack
                    spacing={3}
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-center',
                        flexDirection: 'column',
                        pt: 10,
                        px: 3
                    }}
                >
                    <Item>
                        <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search by service"
                            inputProps={{ 'aria-label': 'search' }}
                            value={(searchService && searchService !== "null") ? searchService : ""}
                            onChange={handleSearchService}
                        />
                        </Search>
                    </Item>
                    <Item>
                        <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search by customer name"
                            inputProps={{ 'aria-label': 'search' }}
                            value={(searchCustomer && searchCustomer !== "null") ? searchCustomer : ""}
                            onChange={handleSearchCustomer}
                        />
                        </Search>
                    </Item>
                    <Item>
                        <Typography
                            variant="h6"
                            component="div"
                            color="black"
                            sx={{
                                fontWeight: 'bold'
                            }}
                            >
                            State
                        </Typography>
                        <RadioGroup 
                            name='filter'
                            aria-labelledby='filter-label'
                            value={state}
                            sx={{
                                px: 5
                            }}
                            onChange={handleState}
                        >
                            <FormControlLabel control={<Radio />} label='All' value={STATE.ALL}/>
                            <FormControlLabel control={<Radio />} label='Awaiting response' value={STATE.AWAITING}/>
                            <FormControlLabel control={<Radio />} label='Accepted' value={STATE.ACCEPTED}/>
                            <FormControlLabel control={<Radio />} label='Cancelled' value={STATE.CANCELLED}/>
                            <FormControlLabel control={<Radio />} label='Expired' value={STATE.EXPIRED}/>
                        </RadioGroup>
                    </Item>
                    <Item>
                        <Typography
                            variant="h6"
                            component="div"
                            color="black"
                            sx={{
                                fontWeight: 'bold'
                            }}
                            >
                            Rework
                        </Typography>
                        <RadioGroup 
                            name='filter'
                            aria-labelledby='filter-label'
                            value={rework}
                            sx={{
                                px: 5
                            }}
                            onChange={handleRework}
                        >
                            <FormControlLabel control={<Radio />} label='All' value={REWORK.ALL}/>
                            <FormControlLabel control={<Radio />} label='Rework' value={REWORK.REWORK}/>
                            <FormControlLabel control={<Radio />} label='Non-rework' value={REWORK.NON_REWORK}/>
                        </RadioGroup>
                    </Item>
                    <Button
                        sx={{
                        bgcolor: "primary.main",
                        "&:hover": { bgcolor: "primary.dark" },
                        "&:disabled": { bgcolor: "secondary.main"}
                        }}
                        onClick={applyFilters}
                    >
                        {<Typography fontWeight="bold" sx={{ color: "white" }}>Apply</Typography>}
                    </Button>
                </Stack>
            </Grid> */}
            <Grid item xs={12}>
                <Box 
                sx={{ 
                    flexGrow: 1,
                    px: 10,
                    pt: 10
                }}
                >
                    <Stack spacing={5} direction="column" marginBottom={theme.spacing(6)}>
                        {requests.map((request, index) => (<RequestTile key={request.requestId} setRequest={setRequest} index={index} request={request}/>))}
                    </Stack>
                </Box>
            </Grid>
        </Grid>
        
    </Box>
  );
};
