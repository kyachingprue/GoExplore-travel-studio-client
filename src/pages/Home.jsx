import React from 'react';
import Banner from '../components/home/Banner';
import TravelCard from '../components/home/TravelCard';
import CompanyCard from '../components/home/CompanyCard';

const Home = () => {
  return (
    <div>
      <Banner />
      <CompanyCard/>
      <TravelCard />
    </div>
  );
};

export default Home;