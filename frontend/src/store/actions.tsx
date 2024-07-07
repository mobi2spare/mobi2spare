import { Action, createAction } from '@reduxjs/toolkit';
import { SET_AADHAR_NUMBER, SET_OTP,SET_CLIENT_ID, SET_USERNAME, SET_PASSWORD, SET_ORG_NAME, SET_PHONE_NUMBER, SET_ADDRESS, SET_TITLE } from './constants';
import { CartItem  } from './store';

export interface SetAadharNumberAction extends Action {
    type: 'SET_AADHAR_NUMBER';
    payload: string; // Payload type for Aadhar number
  }

export interface SetOtpAction extends Action {
    type:"SET_OTP",
    payload: string
}

export interface SetClientIdAction extends Action {
    type:'SET_CLIENT_ID',
    payload:string
}

export interface SetUserNameAction extends Action{
    type:"SET_USERNAME",
    payload : string
}

export interface SetUserPasswordAction extends Action{
    type:"SET_PASSWORD",
    payload : string
}

export interface SetUserOrganizationAction extends Action{
    type:"SET_ORG_NAME",
    payload : string
}

export interface SetUserPhoneNumberAction extends Action{
    type:"SET_PHONE_NUMBER",
    payload : string
}

export interface SetUserAddressAction extends Action{
    type:"SET_ADDRESS",
    payload : string
}
export interface SetTitleAction extends Action{
    type :"SET_TITLE",
    payload: string
}

// export interface AddCartData  {
//      type: 'ADD_TO_CART',
//      payload:CartItem 
// }

// export interface SetCartId { 
//     type : 'SET_CART_ID',
//     payload:number
// }


export const setAadharNumber = createAction<string>(SET_AADHAR_NUMBER);
export const setOtp = createAction<string>(SET_OTP);
export const setClientId = createAction<string>(SET_CLIENT_ID);
export const setUserName = createAction<string>(SET_USERNAME);
export const setUserPassword = createAction<string>(SET_PASSWORD);
export const setOrgName = createAction<string>(SET_ORG_NAME);
export const setPhoneNumber = createAction<string>(SET_PHONE_NUMBER);
export const setAddress = createAction<string>(SET_ADDRESS);
export const setTitle = createAction<string>(SET_TITLE);
// export const addToCart = createAction<CartItem>(ADD_TO_CART);
// export const setCartId = createAction<string>(SET_CART_ID);

