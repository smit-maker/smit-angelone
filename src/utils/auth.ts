
// Function to store token in local storage
export const storeToken = (token: string) => {
    localStorage.setItem('access_token', token);
};

// Function to get token from local storage
export const getToken = () => {
  return localStorage.getItem('access_token');
};

// Function to remove token from local storage
export const removeToken = () => {
  localStorage.removeItem('access_token');
};

