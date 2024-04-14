import React from 'react';
import { CartProvider } from './cart/cart.context';

type VerifiedImages = {
  verifiedStocks: FormData | null,
  verifiedShop: FormData | null,
  verifiedDocument: FormData | null
}
export interface State {
  displaySidebar: boolean;
  drawerView: string | null;
  displayModal: boolean;
  displayCart: boolean;
  modalView: string | null;
  modalData: any;
  verifiedStageImages: VerifiedImages
}

const initialState = {
  displaySidebar: false,
  drawerView: null,
  displayModal: false,
  displayCart: false,
  modalView: null,
  modalData: null,
  verifiedStageImages: {
    verifiedStocks: null,
    verifiedShop: null,
    verifiedDocument: null
  }
};

type Action =
  | {
    type: 'OPEN_SIDEBAR';
  }
  | {
    type: 'CLOSE_SIDEBAR';
  }
  | {
    type: 'OPEN_CART';
  }
  | {
    type: 'CLOSE_CART';
  }
  | {
    type: 'SET_DRAWER_VIEW';
    view: DRAWER_VIEWS;
  }
  | {
    type: 'OPEN_MODAL';
  }
  | {
    type: 'CLOSE_MODAL';
  }
  | {
    type: 'SET_MODAL_VIEW';
    view: MODAL_VIEWS;
  }
  | {
    type: 'SET_MODAL_DATA',
    data: any,
  }
  | {
    type: 'SET_VERIFIED_DATA',
    data: VerifiedImages
  }

type MODAL_VIEWS = 'DISPLAY_FILTER | PRODUCT_VIEW';
type DRAWER_VIEWS = 'CART_SIDEBAR' | 'MOBILE_MENU';

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        displaySidebar: true,
      };
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        displaySidebar: false,
        drawerView: null,
      };
    }
    case 'SET_DRAWER_VIEW': {
      return {
        ...state,
        drawerView: action.view,
      };
    }
    case 'OPEN_CART': {
      return {
        ...state,
        displayCart: true,
      };
    }
    case 'CLOSE_CART': {
      return {
        ...state,
        displayCart: false,
      };
    }
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true,
      }
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        displayModal: false,
      }
    }
    case 'SET_MODAL_VIEW': {
      return {
        ...state,
        modalView: action.view
      }
    }
    case 'SET_MODAL_DATA': {
      return {
        ...state,
        modalData: action.data
      }
    }
    case 'SET_VERIFIED_DATA': {
      return {
        ...state,
        verifiedStageImages: {
          ...state.verifiedStageImages,
          verifiedStocks: action.data.verifiedStocks,
          verifiedShop: action.data.verifiedShop,
          verifiedDocument: action.data.verifiedDocument
        }
      }
    }
  }
}
export const UIProvider: React.FC = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const openSidebar = () => dispatch({ type: 'OPEN_SIDEBAR' });
  const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' });
/*   const closeSidebarIfPresent = () =>
  state.displaySidebar && dispatch({ type: 'CLOSE_CART' }); */
  const openCart = () => dispatch({ type: 'OPEN_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });
  const toggleCart = () =>
    state.displaySidebar
      ? dispatch({ type: 'CLOSE_CART' })
      : dispatch({ type: 'OPEN_CART' });
  const closeCartIfPresent = () =>
    state.displaySidebar && dispatch({ type: 'CLOSE_CART' });
  const openModal = () => dispatch({ type: 'OPEN_MODAL' });
  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' });
  const setModalView = (view: MODAL_VIEWS) =>
    dispatch({ type: 'SET_MODAL_VIEW', view });
  const setModalData = (data: any) =>
    dispatch({ type: 'SET_MODAL_DATA', data });
  const setDrawerView = (view: DRAWER_VIEWS) =>
    dispatch({ type: 'SET_DRAWER_VIEW', view });
  const setVerifiedImages = (data: VerifiedImages) => dispatch({
    type: 'SET_VERIFIED_DATA', data
  });

  const value = React.useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      setDrawerView,
      openCart,
      closeCart,
      toggleCart,
      closeCartIfPresent,
      openModal,
      closeModal,
      setModalView,
      setModalData,
      setVerifiedImages
    }),
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

// @ts-ignore
export const ManagedUIContext: React.FC = ({ children }) => (
  // @ts-ignore
  <CartProvider>
    {/* @ts-ignore */}
    <UIProvider>{children}</UIProvider>
  </CartProvider>
);
