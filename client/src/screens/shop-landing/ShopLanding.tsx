import React from 'react';
import TopNav from '../profile/TopNav';
import { ShopQuotesList } from './ShopQuotesList';

const LandingPage = () => {
  const UI_WIDTH = 1600;
  return (
    <>
      <TopNav height={60} uiWidth={UI_WIDTH}></TopNav>
      <ShopQuotesList></ShopQuotesList>
    </>
  );
};

export default LandingPage;