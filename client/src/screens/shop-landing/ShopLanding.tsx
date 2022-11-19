import React, { useEffect, useState } from 'react';
import TopNav from '../profile/TopNav';
import { ShopQuotesList } from './ShopQuotesList';

const LandingPage = () => {
  const UI_WIDTH = window.innerWidth - 50;
  const [sort, setSort] = useState("date");
  const [search, setSearch] = useState("null");

  useEffect(() => {
    const loadData = async () => {
      const searchTerm = search.length > 0 ? search : "null";
    };

    loadData();
  }, [sort, search]);

  return (
    <>
      <TopNav height={60} uiWidth={UI_WIDTH}></TopNav>
      <ShopQuotesList search={search} setSearch={setSearch} sort={sort} setSort={setSort}></ShopQuotesList>
    </>
  );
};

export default LandingPage;