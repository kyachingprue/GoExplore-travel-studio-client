import TravelCard from '../components/home/TravelCard';
import CompanyCard from '../components/home/CompanyCard';
import CardSection from '../components/home/CardSection';
import CategoryCards from '../components/home/CategoryCards';
import WorldTravelSection from '../components/home/WorldTravelSection';
import TravelSwiperSection from '../components/home/TravelSwiperSection';
import Banner from '../components/home/Banner';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Home = () => {
  useDocumentTitle("Home");
  return (
    <div>
      <Banner/>
      <CompanyCard />
      <CategoryCards />
      <WorldTravelSection />
      <CardSection />
      <TravelSwiperSection/>
      <TravelCard />
    </div>
  );
};

export default Home;