import React from 'react';
import { Quote } from '../../interfaces';
import { QuoteTile } from './QuoteTile';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Box, Grid, Stack, Typography, Paper, InputBase } from '@mui/material';

interface ShopQuotesListProps {
    search: string,
    setSearch: (_search: string) => void
    // filter: date, state, service type, rework/non-rework
    sort: string
    setSort: (_price: string) => void
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

export const ShopQuotesList = ({ search, setSearch, sort, setSort }: ShopQuotesListProps) => {
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSort(event.target.value);
    };
  return (
    <Box>
        <Grid container>
            <Grid item xs={2}>
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
                            placeholder="Search for quotes"
                            inputProps={{ 'aria-label': 'search' }}
                            value={(search && search !== "null") ? search : ""}
                            onChange={handleSearch}
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
                            Filters
                        </Typography>
                        <RadioGroup 
                            name='filter'
                            aria-labelledby='filter-label'
                            value={sort}
                            sx={{
                                px: 5
                            }}
                            onChange={handleChange}
                        >
                            <FormControlLabel control={<Radio />} label='Date' value='date'/>
                            <FormControlLabel control={<Radio />} label='State' value='state'/>
                            <FormControlLabel control={<Radio />} label='Service' value='service'/>
                            <FormControlLabel control={<Radio />} label='Rework' value='rework'/>
                        </RadioGroup>
                    </Item>
                </Stack>
            </Grid>
            <Grid item xs={10}>
                <Box 
                sx={{ 
                    flexGrow: 1,
                    py: 5,
                    px: 20,
                    pt: 10
                }}
                >
                    <Stack spacing={5} direction="column">
                        <QuoteTile></QuoteTile>
                        <QuoteTile></QuoteTile>
                        <QuoteTile></QuoteTile>
                        <QuoteTile></QuoteTile>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
        
    </Box>
  );
};
