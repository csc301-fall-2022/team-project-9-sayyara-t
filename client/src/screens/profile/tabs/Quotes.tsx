import { Box, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Request, User, Vehicle } from '../../../interfaces';
import { useRequestService } from '../../../services/useRequestService';
import ErrorMessages from '../../../shared/ErrorMessages';
import RequestCard from './RequestCard';
import { Grid, Alert, Button } from '@mui/material';
import { PATHS } from '../../../constants';
import { useNavigate } from 'react-router-dom';


interface QuotesProps {
  user: User,
  vehicles: Vehicle[]
}

const Quotes = ({ user, vehicles }: QuotesProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const requestService = useRequestService();

  const [requests, setRequests] = useState([] as Request[]);
  const [errorMessages, setErrorMessages] = useState([] as string[]);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await requestService.getRequestsbyUserId(user.userId).then((_requests: Array<Request>) => {
        if (_requests.length !== 0) {
          setIsEmpty(false);
        }
        setRequests(_requests);
      },
      (error: Error) => setErrorMessages([...errorMessages, error.message]));
    };

    loadData();
  }, []);

  const setRequest = (_request: Request, index: number) => {
    const _requests = [...requests];
    _requests[index] = _request;
    setRequests(_requests);
  };

  const onRequestRemove = (index: number) => {
    const _requests = [...requests];
    _requests.splice(index, 1);
    if (_requests.length === 0) {
      setIsEmpty(true);
    }
    setRequests(_requests);
  };

  const handlePage = () => {
    navigate(PATHS.LANDING);
  };

  const renderPopUp = () => {
    return<Grid container flexGrow={1} marginBottom={5}>
            <Alert
                severity='info'
                action={
                <Button color="inherit" size="small" onClick={handlePage}>
                    Back to main page
                </Button>
                }
                sx={{
                    flexGrow: 1
                }}
            >
                You have no available requests or quotes
            </Alert>
        </Grid>;
};

  return (
    <Box>
      {errorMessages.length > 0 ? 
        <ErrorMessages 
          errorMessages={errorMessages} 
          width={0} 
          onDismiss={() => setErrorMessages([])}
        /> : <Box>
          <div>
            {isEmpty && renderPopUp()}
          </div>
          {requests.map((request, index) => (
          <Box 
            marginBottom={theme.spacing(5)} 
            key={request.requestId}
          >
            <RequestCard
              request={request} 
              vehicles={vehicles}
              setRequest={setRequest}
              onRequestRemove={onRequestRemove}
              index={index}
            />
          </Box>))}
        </Box>}
    </Box>
  );
};

export default Quotes;