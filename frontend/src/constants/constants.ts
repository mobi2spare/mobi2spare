import exp from "constants";

export const TOKEN = 'token'
export const REFRESHTOKEN = 'refreshToken'
export const USER = 'user'
export const UI_BASE_URL = '//localhost:8801'
// export const 
export const ROLES = {
    Admin: 'Admin',
    DeliveryPartner: 'DeliveryPartner',
    GeneralUser: 'GeneralUser' // Buyer and Seller Both.
}


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



