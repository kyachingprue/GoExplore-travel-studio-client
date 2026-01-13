import React from 'react';
import AboutBanner from '../components/about/AboutBanner';
import AboutTravelSection from '../components/about/AboutTravelSection';
import AboutWhyWeTravel from '../components/about/AboutWhyWeTravel';
import useDocumentTitle from '../hooks/useDocumentTitle';

const About = () => {
  useDocumentTitle("About Us")
  return (
    <div>
      <AboutBanner />
      <AboutTravelSection />
      <AboutWhyWeTravel/>
    </div>
  );
};

export default About;