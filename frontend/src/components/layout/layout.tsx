import { Outlet } from 'react-router-dom';
// import Footer from './footer/footer';
import Header from './header/header';
// import BottomNavigation from './mobile-navigation/mobile-navigation';

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main
        className='relative flex-grow pt-[20px] pb-[150px]'
        style={{
          minHeight: '-webkit-fill-available',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <Outlet />
      </main>
      {/* <Footer /> */}
      {/* <BottomNavigation /> */}
    </div>
  );
};

export default Layout;
