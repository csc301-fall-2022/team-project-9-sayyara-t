import { Box, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Request, User, Vehicle } from '../../../interfaces';
import { useRequestService } from '../../../services/useRequestService';
import ErrorMessages from '../../../shared/ErrorMessages';
import RequestCard from './RequestCard';

interface QuotesProps {
  user: User,
  vehicles: Vehicle[]
}

const Quotes = ({ user, vehicles }: QuotesProps) => {
  const theme = useTheme();
  const requestService = useRequestService();

  const [requests, setRequests] = useState([] as Request[]);
  const [errorMessages, setErrorMessages] = useState([] as string[]);

  useEffect(() => {
    const loadData = async () => {
      await requestService.getRequestsbyUserId(user.userId).then((_requests) => setRequests(_requests),
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
    setRequests(_requests);
  };

  return (
    <Box>
      {errorMessages.length > 0 ? 
        <ErrorMessages 
          errorMessages={errorMessages} 
          width={0} 
          onDismiss={() => setErrorMessages([])}
        /> : <Box>
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