
export const TOKEN = 'token'
export const ROLES = {
    Admin: 'Admin',
    DeliveryPartner: 'DeliveryPartner',
    GeneralUser: 'GeneralUser' // Buyer and Seller Both.
}


// interface MenuIcons {
//     REQUEST_FOR_PART_ICON: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
//     SELL_PARTS_ICON: OverridableComponent<SvgIconTypeMap<{}, "svg">>; // Optional property
//     NOTIFICATIONS_ICON: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
//   }
// export const iconMapping: MenuIcons  = {
//     REQUEST_FOR_PART_ICON: RequestQuoteIcon,
//     SELL_PARTS_ICON: SellIcon,
//     NOTIFICATIONS_ICON: NotificationsIcon,
//   };

interface MenuLabels {
    USER_PROFILE : string,
    REQUEST_FOR_PART: string;
    SELL_PARTS: string;
    NOTIFICATIONS: string;
    CHECKOUT:string
  }

export const MENU_LABELS : MenuLabels  = {
    USER_PROFILE: 'Profile',
    REQUEST_FOR_PART : 'Request Parts',
    SELL_PARTS : 'Sell',
    NOTIFICATIONS : 'Notifications',
    CHECKOUT: 'Checkout'

}



