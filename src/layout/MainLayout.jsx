import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <section className='bg-sky-100'>
      <div className='max-w-xl sm:max-w-2xl lg:max-w-5xl xl:max-w-7xl mx-auto'>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </section>
  );
};

export default MainLayout;