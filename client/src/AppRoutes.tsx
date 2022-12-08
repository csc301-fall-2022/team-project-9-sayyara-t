import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PATHS } from './constants';
import PrivateRoute from './shared/PrivateRoute';

import LogIn from './screens/auth/LogIn';
import Reset from './screens/auth/Reset';
import SignUp from './screens/auth/SignUp';
import LandingPage from './screens/landing/LandingPage';
import ShopProfile from './screens/shop/ShopProfile';
import UserProfile from './screens/profile/UserProfile';
import ShopLanding from './screens/shop-landing/ShopLanding';
import RequestQuote from './screens/request/RequestQuote';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PATHS.LANDING} element={<LandingPage />}/>
      <Route path={PATHS.SHOP_PROFILE} element={<ShopProfile />} />
      <Route path={PATHS.LOGIN} element={<LogIn />} />
      <Route path={PATHS.RESET} element={<Reset />} />
      <Route path={PATHS.SIGNUP} element={<SignUp />} />
      <Route path={PATHS.MANAGEMENT} element={<PrivateRoute child={<ShopLanding />} />}/>
      <Route path={PATHS.USER} element={<PrivateRoute child={<UserProfile />}/>} />
      <Route path={PATHS.REQUEST} element={<PrivateRoute child={<RequestQuote />}/>} />
    </Routes>
  );
};

export default AppRoutes;