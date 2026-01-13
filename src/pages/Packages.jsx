import GoExploreJourneySection from '../components/packages/GoExploreJourneySection';
import PackageBanner from '../components/packages/PackageBanner';
import PackageData from '../components/packages/PackageData'


const Packages = () => {
  return (
    <div>
      <PackageBanner />
      <PackageData />
      <GoExploreJourneySection/>
    </div>
  );
};

export default Packages;