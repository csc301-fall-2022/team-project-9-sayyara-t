import React, { useEffect, useState } from 'react';
import TopNav from '../profile/TopNav';
import { ShopQuotesList } from './ShopQuotesList';
import {useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { PATHS } from '../../constants';
import { Request } from '../../interfaces';
import { useUserService } from '../../services/useUserService';
import { User } from '../../interfaces';

const ShopLandingPage = () => {
  const UI_WIDTH = window.innerWidth - 50;
  const [state, setState] = useState(0);
  const [rework, setRework] = useState(0);
  const [searchService, setSearchService] = useState("null");
  const [searchCustomer, setSearchCustomer] = useState("null");
  // const [requests, setRequests] = useState([] as Array<Request>);
  const [user, setUser] = useState({} as User);
  const navigate = useNavigate();
  const params = useParams();
  const userService = useUserService();

  useEffect(() => {
    if (sessionStorage.getItem('roleId') !== '3') {
      navigate(PATHS.LANDING);
    }
    const loadData = async () => {
      const searchServiceTerm = searchService.length > 0 ? searchService : "null";
      const searchCustomerTerm = searchCustomer.length > 0 ? searchCustomer : "null";
    };

    const loadUser = async () => {
      const userId: string = params.userId as string;
      const currentUserId = sessionStorage.getItem('userId');
      const _user = await userService.getCurrentUser().then((_user: User) => {
        setUser(_user);
        return _user;
      });
      setUser(_user);
    };

    loadData();
    loadUser();
  }, [state, rework, searchService, searchCustomer]);

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