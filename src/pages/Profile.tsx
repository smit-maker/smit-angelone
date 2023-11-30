import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getToken, removeToken } from '../utils/auth';

// let env = process.env["REACT_APP_BASE_URL"];
import { config } from '../utils/config';

const apiKey = config.REACT_APP_BASE_URL;

type ResponseData = {
  username: string;
  email: string,
  disabled: boolean;
  full_name: string;
};

const ProfilePage: React.FC = () => {
  const token = getToken();
  const [responseData, setResponseData] = useState<ResponseData>({
    username: '',
    email: '',
    disabled: false,
    full_name: '',
  });

  useEffect(() => {
    fetch(`${apiKey}/users/me`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => {
        if (!response.ok) {
          setTimeout(() => {
            removeToken();
            alert('Network response was not ok');
            window.location.reload();  // Refresh the page after alert
          }, 1000);
        }
        return response.json();
      })
      .then(data => {
        setResponseData(data);
      })
      .catch(error => console.error('Error:', error));
  }, [token]);
  
  return (
    <div className="container">
      <div className="row row-cols-2">
        <div className="border col-12"><h2 className='text-center mt-5'>Welcome to the Profile Page!</h2></div>
        <div className="border col-12">
            <div className="border col-12">
              <div>
                <p>Username: {responseData.username}</p>
                <p>Email: {responseData.email}</p>
                <p>Disabled: {responseData.disabled ? 'Yes' : 'No'}</p>
                <p>Full Name: {responseData.full_name}</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
