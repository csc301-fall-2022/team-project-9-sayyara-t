import React, { useEffect, useState } from 'react';
import TopNav from '../profile/TopNav';
import { ShopQuotesList } from './ShopQuotesList';
import {useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { PATHS, UI_WIDTH } from '../../constants';
import { Request } from '../../interfaces';
import { useUserService } from '../../services/useUserService';
import { User } from '../../interfaces';

const ShopLandingPage = () => {
  const [state, setState] = useState(0);
  const [rework, setRework] = useState(0);
  const [searchService, setSearchService] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");
  // const [requests, setRequests] = useState([] as Array<Request>);
  const [user, setUser] = useState({} as User);
  const navigate = useNavigate();
  const params = useParams();
  const userService = useUserService();

  useEffect(() => {
    if (sessionStorage.getItem('roleId') !== '3') {
      navigate(PATHS.LANDING);
    }

    const loadUser = async () => {
      await userService.getCurrentUser().then((_user: User) => {
        setUser(_user);
      });
    };

    loadUser();
  }, []);

  return (
    <>
      <TopNav height={60} uiWidth={UI_WIDTH}></TopNav>
      <ShopQuotesList 
        searchService={searchService}
        setSearchService={setSearchService}
        searchCustomer={searchCustomer}
        setSearchCustomer={setSearchCustomer}
        state={state}
        setState={setState}
        rework={rework}
        setRework={setRework}
        user={user}
      />
    </>
  );
};

export default ShopLandingPage;