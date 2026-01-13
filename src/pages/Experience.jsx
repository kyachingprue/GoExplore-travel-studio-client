import React from 'react';
import ExperienceBanner from '../components/experiences/ExperienceBanner';
import ReviewCard from '../components/experiences/ReviewCard';
import ExperienceCard from '../components/experiences/ExperienceCard';
import TravelExperienceSection from '../components/experiences/TravelExperienceSection';

const Experience = () => {
  return (
    <div>
      <ExperienceBanner />
      <ExperienceCard />
      <TravelExperienceSection/>
      <ReviewCard/>
    </div>
  );
};

export default Experience;