import React, { useEffect, useState } from 'react';
import TopNav from '../profile/TopNav';
import { ShopQuotesList } from './ShopQuotesList';
import {useNavigate} from "react-router-dom";
import { PATHS, UI_WIDTH } from '../../constants';
import { useUserService } from '../../services/useUserService';
import { User } from '../../interfaces';

/* Component usage: This is the landing page for the shop owners
 * Contains:
 * - A top navigation bar that allows users to log out or navigate to the profile page
 * - A filter section with 2 search bars (service and customer name), state of displayed requests
 * and an apply button
 */

const ShopLandingPage = () => {
  const [state, setState] = useState(0);
  const [rework, setRework] = useState(0);
  const [searchService, setSearchService] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");
  
  const [user, setUser] = useState({} as User);
  const navigate = useNavigate();
  const userService = useUserService();

  useEffect(() => {
    if (sessionStorage.getItem('roleId') !== '3') {
      navigate(PATHS.LANDING);
    }

    // function that loads all necessary data for the page
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