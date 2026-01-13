import React from 'react';
import AboutBanner from '../components/about/AboutBanner';
import AboutTravelSection from '../components/about/AboutTravelSection';
import AboutWhyWeTravel from '../components/about/AboutWhyWeTravel';

const About = () => {
  return (
    <div>
      <AboutBanner />
      <AboutTravelSection />
      <AboutWhyWeTravel/>
    </div>
  );
};

export default About;