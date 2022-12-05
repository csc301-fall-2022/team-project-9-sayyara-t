import React, { useEffect, useState } from 'react';
import { NavigationBar } from './NavigationBar';
import { Body } from './Body';
import { useShopService } from '../../services/useShopService';
import { Shop } from '../../interfaces';

/* Component usage: This is the main landing page for the general user (vehicle owners) and
 * unregistered users
 * Contains:
 * - A navigation bar (NavigationBar.tsx) that has the search function and button to
 * redirect to the profile page (if logged in) or log in page (unregistered users) 
 * - A main body which displays the filter for displayed shops and shop tiles (which
 * represent all the available shops in our system)
 */

const LandingPage = () => {
  const [sort, setSort] = useState("price");
  const [search, setSearch] = useState("null");
  const [shops, setShops] = useState([] as Array<Shop>);

  const shopService = useShopService();
  
  useEffect(() => {
    // function that load all necessary data for the page
    const loadData = async () => {
      const searchTerm = search.length > 0 ? search : "null";
      await shopService.getAllShops(sort, searchTerm).then((_shops) => setShops(_shops),
        (error: Error) => console.log(error.message));
    };

    loadData();
  }, [sort, search]);

  return (
    <>
      <NavigationBar search={search} setSearch={setSearch}></NavigationBar>
      <Body shops={shops} sort={sort} setSort={setSort}></Body>
    </>
  );
};

export default LandingPage;