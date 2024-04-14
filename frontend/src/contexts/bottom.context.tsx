import React, { createContext, useState } from 'react';

const BottomTabContext = createContext({
    selectedTab: "Home",
    handleTabChange: (_newTab:string) => {},
  });

const BottomTabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState('Home'); // Initial selected tab

    const handleTabChange = (newTab:string) => setSelectedTab(newTab);

    return (
        <BottomTabContext.Provider value={{ selectedTab, handleTabChange }}>
            {children}
        </BottomTabContext.Provider>
    );
};

export { BottomTabContext, BottomTabProvider };
