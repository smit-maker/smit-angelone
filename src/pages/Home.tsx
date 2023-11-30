import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getToken, removeToken } from '../utils/auth';
import { config } from '../utils/config';

const apiKey = config.REACT_APP_BASE_URL;

// type ResponseData = {
//   username: string;
//   email: string,
//   disabled: boolean;
//   full_name: string;
// };

const HomePage: React.FC = () => {
  const token = getToken();
  // const [responseData, setResponseData] = useState<ResponseData>({
  //   username: '',
  //   email: '',
  //   disabled: false,
  //   full_name: '',
  // });

  useEffect(() => {
    fetch(`${apiKey}/users/me`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(" --- data : ",data)
      })
      .catch(error => console.error('Error:', error));
  }, []);
  
  return (
    <div className="container">
      <div className="row row-cols-2 mt-5">
        <div className="border col-12"><h2 className='text-center mt-5'>Welcome to the Home Page!</h2></div>
        <div className="border col-12">

        </div>
      </div>
    </div>
  );
};

export default HomePage;
