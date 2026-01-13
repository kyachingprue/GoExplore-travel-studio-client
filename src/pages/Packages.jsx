import GoExploreJourneySection from '../components/packages/GoExploreJourneySection';
import PackageBanner from '../components/packages/PackageBanner';
import PackageData from '../components/packages/PackageData'
import useDocumentTitle from '../hooks/useDocumentTitle';


const Packages = () => {
  useDocumentTitle("Packages")
  return (
    <div>
      <PackageBanner />
      <PackageData />
      <GoExploreJourneySection/>
    </div>
  );
};

export default Packages;