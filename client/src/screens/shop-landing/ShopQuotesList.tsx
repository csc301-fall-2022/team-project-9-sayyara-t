import React from 'react';
import { Quote } from '../../interfaces';
import { QuoteTile } from './QuoteTile';
import { Box, Stack } from '@mui/material';

export const ShopQuotesList = () => {
  return (
    <Box>
        <Box 
            sx={{ 
                flexGrow: 1,
                py: 5,
                px: 20
            }}
        >
            <Stack spacing={5} direction="column">
                <QuoteTile></QuoteTile>
                <QuoteTile></QuoteTile>
                <QuoteTile></QuoteTile>
                <QuoteTile></QuoteTile>
            </Stack>
        </Box>
    </Box>
  );
};
