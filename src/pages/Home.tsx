import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getToken } from '../utils/auth';
import { config } from '../utils/config';

const apiKey = config.REACT_APP_BASE_URL;

type ResponseItem = {
  token: string;
  symbol: string;
  name: string;
  expiry: string;
  strike: string;
  lotsize: string;
  instrumenttype: string;
  exch_seg: string;
  tick_size: string;
};

const HomePage: React.FC = () => {
  const token = getToken();
  const [symbol, setSymbol] = useState<string>('BANKNIFTY06DEC2345000CE');
  const [limit, setLimit] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);
  const [responseDataList, setResponseDataList] = useState<ResponseItem[]>([]);

  const fetchData = () => {
    fetch(`${apiKey}/angelone/get_data_json?symbol=${symbol}&limit=${limit}&skip=${skip}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => response.json())
      .then(data => {
        setResponseDataList(data.result);
        console.log('--- Get Token Response Data : ', responseDataList);
      })
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    fetchData();
  }, [symbol, limit, skip]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  return (
    // <div className="container">
      <div className="row row-cols-2 mt-2">
        <div className="col-12">
          <h2 className="text-center mt-5">Welcome to the Home Page!</h2>
        </div>
        <div className="col-12">
          <form className="login-form border-top" onSubmit={handleSubmit}>
            
            <div className="form-group row g-3 m-2">
              <div className="col-auto">
                <input className="form-control" type="text" placeholder="BANKNIFTY06DEC2345000CE" value={symbol} onChange={(e) => setSymbol(e.target.value)}/>
              </div>
              <div className="col-auto">
                <input className="form-control" type="number" placeholder="" value={limit} onChange={(e) => setLimit(Number(e.target.value))}/>
              </div>
              <div className="col-auto">
                <input className="form-control" type="number" placeholder="" value={skip} onChange={(e) => setSkip(Number(e.target.value))}/>
              </div>
              <div className="col-auto">
                <button className="btn btn-primary btn" type="submit">Fetch Data</button>
              </div>
            </div>

          </form>

          <table className="table table-bordered mt-5 border">
            <thead>
              <tr>
                <th>Token</th>
                <th>Symbol</th>
                <th>Name</th>
                <th>Expiry</th>
                <th>Strike</th>
                <th>Lotsize</th>
                <th>Instrument Type</th>
                <th>Exchange Segment</th>
                <th>Tick Size</th>
              </tr>
            </thead>
            <tbody>
              {responseDataList.map((responseData, index) => (
                <tr key={index}>
                  <td>{responseData.token}</td>
                  <td>{responseData.symbol}</td>
                  <td>{responseData.name}</td>
                  <td>{responseData.expiry}</td>
                  <td>{responseData.strike}</td>
                  <td>{responseData.lotsize}</td>
                  <td>{responseData.instrumenttype}</td>
                  <td>{responseData.exch_seg}</td>
                  <td>{responseData.tick_size}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    // </div>
  );
};

export default HomePage;
