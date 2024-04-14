import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import logo from '../../assets/logo1.png';
import { AuthContext } from "../../../contexts/auth.context";
import { SIGN_IN } from "../../../router/router-path";
// import { addActiveScroll } from "../../../utils/add-active-scroll";
// import CartButton from "../../cart/cart-button";
import Logo from "../../ui/logo";
import HeaderMenu from "./header-menu";
import Button from "../../ui/button";
// import { TOKEN } from '../../../helper/constants/constants';
// import { useLogoutMutation } from "../../../framework/basic-rest/auth/use-logout";
// import { siteSettings } from "../../../settings/site-settings";


export const siteSettings = {
  name: 'Mobi2Spare',
  site_header: {
      menu: [

        {
          id: 4,
          path: SIGN_IN,
          label: 'Login'
      },
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


type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const Header: React.FC = () => {
  const { site_header } = siteSettings;
  const menu = site_header.menu;

  const navigate = useNavigate();
  const siteHeaderRef = useRef() as DivElementRef;
  // addActiveScroll(siteHeaderRef);

  const { authenticated } = useContext(AuthContext);
  // const { mutate: logout } = useLogoutMutation();

  const onClickOfLogoutButton = () => {
    // logout();
  };

  return (
    <>
      <header
        id="siteHeader"
        className="relative z-20 w-full h-16 sm:h-20 lg:h-18"
      >
        <div className="fixed z-20 w-full h-16 px-4 text-gray-700 transition duration-200 ease-in-out bg-white innerSticky body-font sm:h-20 lg:h-18 md:px-8 lg:px-6">
          <div className="flex items-center justify-center mx-auto max-w-[1920px] h-full w-full">
            {/* <Logo
              src={logo}
              alt="mobi2spare"
            /> */}
            <HeaderMenu
              data={menu}
              className="hidden lg:flex ltr:md:ml-6 rtl:md:mr-6 ltr:xl:ml-10 rtl:xl:mr-10"
            />

            <div className="flex-shrink-0 ltr:ml-auto rtl:mr-auto ltr:lg:mr-5 rtl:lg:ml-5 ltr:xl:mr-8 rtl:xl:ml-8 ltr:2xl:mr-10 rtl:2xl:ml-10"></div>
            <div className="items-center justify-end flex-shrink-0 hidden lg:flex gap-x-6 lg:gap-x-5 xl:gap-x-8 2xl:gap-x-10 ltr:ml-auto rtl:mr-auto">
              <div className="-mt-0.5 flex-shrink-0">
                {authenticated ? (
                  <button
                    className="text-sm xl:text-base text-heading font-semibold focus:outline-none"
                    onClick={onClickOfLogoutButton}
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    className="text-sm xl:text-base text-heading font-semibold focus:outline-none"
                    onClick={() => navigate(SIGN_IN)}
                  >
                    {" "}
                    Sign In
                  </button>
                )}
              </div>
              {authenticated &&
                <Button />
              }
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
