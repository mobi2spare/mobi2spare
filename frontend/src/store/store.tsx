import {
  Action,
  Reducer,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';
import { SET_AADHAR_NUMBER, SET_OTP, SET_CLIENT_ID, SET_USERNAME, SET_PASSWORD, SET_ORG_NAME, SET_PHONE_NUMBER, SET_ADDRESS, SET_TITLE } from './constants';
import { SetAadharNumberAction, SetClientIdAction, SetOtpAction, SetUserNameAction, SetUserAddressAction, SetUserPasswordAction, SetUserOrganizationAction, SetUserPhoneNumberAction, SetTitleAction } from './actions';

export interface CartItem {

  product_id: number,
  quantity: number

}
const initialState = {
  user: {
    adharNumber: '',
    otp: "",
    clientid: "",
    fullName: "",
    phoneNumber: "",
    organizationName: "",
    password: "",
    address: "",

  },
  app: {
    title: ''
  }

};

type MobiSpareAction =  SetAadharNumberAction | SetOtpAction | SetClientIdAction | SetUserAddressAction | SetUserNameAction | SetUserPasswordAction | SetTitleAction | SetUserOrganizationAction | SetUserPhoneNumberAction

const rootReducer: Reducer<any, Action>= (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_AADHAR_NUMBER:
      return { ...state, user: { ...state.user, adharNumber: (action as MobiSpareAction).payload } };
    case SET_OTP:
      return { ...state, user: { ...state.user, otp: (action as MobiSpareAction).payload } };
    case SET_CLIENT_ID:
      return { ...state, user: { ...state.user, clientid: (action as MobiSpareAction).payload } };
    case SET_USERNAME:
      return { ...state, user: { ...state.user, fullName: (action as MobiSpareAction).payload } }
    case SET_ADDRESS:
      return { ...state, user: { ...state.user, address: (action as MobiSpareAction).payload } }
    case SET_PHONE_NUMBER:
      return { ...state, user: { ...state.user, phoneNumber: (action as MobiSpareAction).payload } }
    case SET_PASSWORD:
      return { ...state, user: { ...state.user, password: (action as MobiSpareAction).payload } }
    case SET_ORG_NAME:
      return { ...state, user: { ...state.user, organizationName: (action as MobiSpareAction).payload } }
    case SET_TITLE:
      return { ...state, app: { ...state.app, title: (action as MobiSpareAction).payload } }


    default: {
      return {
        ...state
      }
    }
  }
};


// const cartReducer:Reducer<any, Action> = (state = initialCartState, action: Action) => {
//   switch (action.type) {

//     case SET_CART_ID:
//       return { ...state, cart: { ...state.cart, cart_id: (action as MobiSpareAction).payload } }
//     case ADD_TO_CART:
//       const existingItem = state.cart.products.find(
//         (product:CartItem) => { 
          
//           return product.product_id === ((action as MobiSpareAction).payload as CartItem).product_id
        
//         }
//       );

//       return {
//         ...state,
//         cart: {
//           products: existingItem
//             ? [...state.cart.products.filter((p:CartItem) => p.product_id !== ((action as MobiSpareAction).payload as CartItem).product_id, (action as MobiSpareAction).payload)]
//             : [...state.cart.products, (action as MobiSpareAction).payload],
//         },
//       };
//     default: {
//       return {
//         ...state
//       }
//     }
//   }
// };


const reducer: Reducer<any, Action> = combineReducers({
  // cart: cartReducer,
  root: rootReducer,
});


export const store = configureStore({
  reducer: reducer
}); 






