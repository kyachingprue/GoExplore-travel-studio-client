import React from 'react';
import Banner from '../components/home/Banner';
import TravelCard from '../components/home/TravelCard';
import CompanyCard from '../components/home/CompanyCard';
import CardSection from '../components/home/CardSection';
import CategoryCards from '../components/home/CategoryCards';

const Home = () => {
  return (
    <div>
      <Banner />
      <CompanyCard />
      <CategoryCards/>
      <CardSection/>
      <TravelCard />
    </div>
  );
};

export default Home;