import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/auth.context';
import { useUI } from '../../../contexts/ui.context';
// import CartButton from '../../cart/cart-button';
import { Drawer } from '../../common/drawer/drawer';
import motionProps from '../../common/drawer/motion';
import HomeIcon from '../../icons/home-icon';
import MenuIcon from '../../icons/menu-icon';
import PlusIcon from '../../icons/plus-icon';
import MobileMenu from '../header/mobile-menu';
import Button from '../../ui/button';

const BottomNavigation: React.FC = () => {
  const { closeSidebar, openSidebar, displaySidebar } = useUI();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleMobileMenu = () => {
    return openSidebar();
  };

  return (
    <>
      <div className='lg:hidden fixed z-10 bottom-0 flex items-center justify-between shadow-bottomNavigation text-gray-700 body-font bg-white w-full h-14 sm:h-16 px-4 md:px-8'>
        <button
          aria-label='Menu'
          className='menuBtn flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none'
          onClick={handleMobileMenu}
        >
          <MenuIcon />
        </button>
        <button
          className='flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none'
          onClick={() => navigate('add-product')}
          aria-label='search-button'
        >
          <PlusIcon />
        </button>
        <Link to='/' className='flex-shrink-0'>
          <HomeIcon />
        </Link>
        {user &&
          <Button />
        }
        {/* <UserIcon /> */}
      </div>
      {/* TODO: need to use just one drawer component */}
      <Drawer
        placement={'left'}
        open={displaySidebar}
        onClose={closeSidebar}
        // contentWrapperStyle={'left'}
        {...motionProps}
      >
        <MobileMenu />
      </Drawer>
    </>
  );
};

export default BottomNavigation;
