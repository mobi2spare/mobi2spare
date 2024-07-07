import { useContext, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoYoutube,
  IoClose,
} from 'react-icons/io5';
// import logo from '../../../assets/mobi2spare.svg';
import Logo from '../../ui/logo';
import { useUI } from '../../../contexts/ui.context';
// import Scrollbar from '../../common/scrollbar';
// import { siteSettings } from '../../../settings/site-settings';
import { Link } from 'react-router-dom';
// import { useLogoutMutation } from '../../../framework/basic-rest/auth/use-logout';
import { AuthContext } from '../../../contexts/auth/auth.context';
import { SIGN_IN } from '../../../router/router-path';

const social = [
  {
    id: 0,
    link: 'https://www.facebook.com/redqinc/',
    icon: <IoLogoFacebook />,
    className: 'facebook',
    title: 'text-facebook',
  },
  {
    id: 1,
    link: 'https://twitter.com/redqinc',
    icon: <IoLogoTwitter />,
    className: 'twitter',
    title: 'text-twitter',
  },
  {
    id: 2,
    link: 'https://www.youtube.com/channel/UCjld1tyVHRNy_pe3ROLiLhw',
    icon: <IoLogoYoutube />,
    className: 'youtube',
    title: 'text-youtube',
  },
  {
    id: 3,
    link: 'https://www.instagram.com/redqinc/',
    icon: <IoLogoInstagram />,
    className: 'instagram',
    title: 'text-instagram',
  },
];

export const siteSettings = {
  name: 'Mobi2Spare',
  site_header: {
      menu: [

        {
          id: 4,
          path: SIGN_IN,
          label: 'Login'
      }
          
      ],
      // mobileMenu: [
      //     ...commonMenus,
      //     {
      //         id: 4,
      //         path: SIGN_IN,
      //         label: 'Logout'
      //     }
      // ]
  }
}

export default function MobileMenu() {
  const { closeSidebar } = useUI();
  const { site_header } = siteSettings
  const [activeMenus, setActiveMenus] = useState<any>([]);
  const handleArrowClick = (menuName: string) => {
    let newActiveMenus = [...activeMenus];

    if (newActiveMenus.includes(menuName)) {
      var index = newActiveMenus.indexOf(menuName);
      if (index > -1) {
        newActiveMenus.splice(index, 1);
      }
    } else {
      newActiveMenus.push(menuName);
    }

    setActiveMenus(newActiveMenus);
  };

  const ListMenu = ({
    dept,
    data,
    hasSubMenu,
    menuName,
    menuIndex,
    className = '',
  }: any) => {
    // const { mutate: logout } = useLogoutMutation();
    const { authenticated } = useContext(AuthContext);

    return (
      data.label &&
      <li className={`mb-0.5 ${className}`}>
        <div className='relative flex items-center justify-between'>
          {
            data.label === 'Logout' ?
              !authenticated ?
                null
                : (
                  <a
                    className='w-full text-[15px] menu-item relative py-3 ltr:pl-5 rtl:pr-5 ltr:md:pl-6 rtl:md:pr-6 ltr:pr-4 rtl:pl-4 transition duration-300 ease-in-out'
                    // onClick={() => logout()}
                  >
                    {data.label}
                  </a>
                )
              :
              <Link
                to={data.path}
                className='w-full text-[15px] menu-item relative py-3 ltr:pl-5 rtl:pr-5 ltr:md:pl-6 rtl:md:pr-6 ltr:pr-4 rtl:pl-4 transition duration-300 ease-in-out'
                onClick={closeSidebar}
              >
                <span className='block w-full'>{data.label}</span>
              </Link>
          }
          {hasSubMenu && (
            <div
              className='absolute top-0 flex items-center justify-end w-full h-full text-lg cursor-pointer ltr:left-0 rtl:right-0 ltr:pr-5 rtl:pl-5'
              onClick={() => handleArrowClick(menuName)}
            >
              <IoIosArrowDown
                className={`transition duration-200 ease-in-out transform text-heading ${activeMenus.includes(menuName) ? '-rotate-180' : 'rotate-0'
                  }`}
              />
            </div>
          )}
        </div>
        {hasSubMenu && (
          <SubMenu
            dept={dept}
            data={data.subMenu}
            toggle={activeMenus.includes(menuName)}
            menuIndex={menuIndex}
          />
        )}
      </li>
    );
  }

  const SubMenu = ({ dept, data, toggle, menuIndex }: any) => {
    if (!toggle) {
      return null;
    }

    dept = dept + 1;

    return (
      <ul className='pt-0.5'>
        {data?.map((menu: any, index: number) => {
          const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;

          return (
            <ListMenu
              dept={dept}
              data={menu}
              hasSubMenu={menu.subMenu}
              menuName={menuName}
              key={menuName}
              menuIndex={index}
              className={dept > 1 && 'ltr:pl-4 rtl:pr-4'}
            />
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <div className='flex flex-col justify-between w-full h-full'>
        <div className='w-full border-b border-gray-100 flex justify-between items-center relative ltr:pl-5 rtl:pr-5 ltr:md:pl-7 rtl:md:pr-7 flex-shrink-0 py-0.5 pl-4'>
          <div onClick={closeSidebar}>
            {/* <Logo src={logo} alt='mobi2spare' /> */}
          </div>

          <button
            className='flex items-center justify-center px-4 py-6 text-2xl text-gray-500 transition-opacity md:px-6 lg:py-8 focus:outline-none hover:opacity-60'
            onClick={closeSidebar}
            aria-label='close'
          >
            <IoClose className='text-black mt-1 md:mt-0.5' />
          </button>
        </div>

        {/* <Scrollbar className="flex-grow mb-auto menu-scrollbar">
          <div className="flex flex-col px-0 py-7 lg:px-2 text-heading pl-4">
            <ul className="mobileMenu">
              {site_header.mobileMenu.map((menu, index) => {
                const dept: number = 1;
                const menuName: string = `sidebar-menu-${dept}-${index}`;

                return (
                  <ListMenu
                    dept={dept}
                    data={menu}
                    // hasSubMenu={menu.subMenu}
                    menuName={menuName}
                    key={menuName}
                    menuIndex={index}
                  />
                );
              })}
            </ul>
          </div>
        </Scrollbar> */}

        <div className='flex items-center justify-center flex-shrink-0 bg-white border-t border-gray-100 px-7 gap-x-1'>
          {social?.map((item, index) => (
            <a
              href={item.link}
              className={`text-heading p-5 opacity-60 ltr:first:-ml-4 rtl:first:-mr-4 transition duration-300 ease-in hover:opacity-100 ${item.className}`}
              target='_blank'
              key={index}
            >
              <span className='sr-only'>{item.title}</span>
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
