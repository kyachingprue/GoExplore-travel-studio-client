import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <section className="min-h-screen w-full bg-sky-50">
      <div className="flex min-h-screen w-full flex-col">
        <Navbar />
        <main className="w-full flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </section>
  );
};

export default MainLayout;
