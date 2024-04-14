import React, { createContext, useState } from 'react';

const DrawerContext = createContext({
  isDrawerOpen: false,
  toggleDrawer: () => {},
});

const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export { DrawerContext, DrawerProvider };
