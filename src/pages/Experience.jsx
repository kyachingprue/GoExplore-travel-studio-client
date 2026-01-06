import React from 'react';
import ExperienceBanner from '../components/experiences/ExperienceBanner';
import ReviewCard from '../components/experiences/ReviewCard';
import ExperienceCard from '../components/experiences/ExperienceCard';

const Experience = () => {
  return (
    <div>
      <ExperienceBanner />
      <ExperienceCard/>
      <ReviewCard/>
    </div>
  );
};

export default Experience;