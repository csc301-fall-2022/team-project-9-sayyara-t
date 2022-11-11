import React from 'react';
import { 
  Paper, 
  Typography,
  Box,
  IconButton,
  List,
  ListItem
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import ClearIcon from '@mui/icons-material/Clear';

import { useTheme } from '@mui/material/styles';

interface ErrorMessagesProps {
  errorMessages: Array<string>,
  width: number,
  onDismiss: () => void
}

const ErrorMessages = ({ errorMessages, width, onDismiss }: ErrorMessagesProps) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        width: width !== 0 ? width : "inherit",
        bgcolor: "error.light"
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="space-between"  
        padding={theme.spacing(2)}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          paddingTop={theme.spacing(1)}
        >
          <ErrorIcon color="error" sx={{ marginRight: theme.spacing(2) }}/>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
          >
            <Typography>Something went wrong:</Typography>
            <List sx={{ listStyleType: "disc", pl: 4 }}>
              {errorMessages.map((msg) => (
                <ListItem
                  key={msg}
                  sx={{ display: "list-item", padding: 0 }}
                >
                  <Typography>{msg}</Typography>
                </ListItem>
              ))}
            </List>
          </Box>
          
        </Box>
        <IconButton onClick={onDismiss}>
          <ClearIcon sx={{ fontSize: 15 }}/>
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ErrorMessages;