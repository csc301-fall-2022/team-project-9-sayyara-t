import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Typography
} from '@mui/material';

const UserProfile = () => {
  const params = useParams();

  return (
    <Typography>User Profile for User {params.userId}</Typography>
  );
};

export default UserProfile;