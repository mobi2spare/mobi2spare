// Function to get the stored user data
export const getUser = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  };
  
  // Function to get the stored token
  export const getToken = () => {
    const user = getUser();
    return user ? user.token : null;
  };
  
  // Function to remove user data (if needed)
  export const removeUser = () => {
    localStorage.removeItem('user');
  };
  
  // Function to check if user is logged in (example implementation)
  export const isLoggedIn = () => {
    const userData = getUser();
    return !!userData; // Example: return true if user data exists, false otherwise
  };
  