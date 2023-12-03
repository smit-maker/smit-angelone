import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getToken } from '../utils/auth';
import { config } from '../utils/config';

const apiKey = config.REACT_APP_BASE_URL;

// [timestamp, open, high, low, close, volume]
type ResponseItem = {
  timestamp: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};

const TokenPage: React.FC = () => {
  const accessToken = getToken();
  const [loading, setLoading] = useState<boolean>(false);

  const [exchange, setExchange] = useState<string>('NFO');
  const [token, setToken] = useState<String>('41011');
  const [interval, seItnterval] = useState<String>('FIVE_MINUTE');
  const [fromdate, setFromdate] = useState<String>('2023-12-01 09:30');
  const [todate, setTodate] = useState<String>('2023-12-01 09:45');
  const [responseDataList, setResponseDataList] = useState<ResponseItem[]>([]);


  const fetchData = () => {
    setLoading(true);

    fetch(`${apiKey}/angelone/display_table_view_json?exchange=${exchange}&token=${token}&interval=${interval}&fromdate=${fromdate}&todate=${todate}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(response => response.json())
      .then(data => {
        setResponseDataList(data.data.map((item: { toString: () => any; }[]) => ({
          timestamp: item[0],
          open: item[1].toString(),
          high: item[2].toString(),
          low: item[3].toString(),
          close: item[4].toString(),
          volume: item[5].toString(),
        })));
        console.log('--- Get Candel Response Data : ', responseDataList);
      })
      .catch(error => console.error('Error:', error))
      .finally(() => setLoading(false));
  };
  
  // useEffect(() => {
  //   fetchData();
  // }, [exchange, token, interval, fromdate, todate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };
  
  const getHighClass = (responseData: { timestamp?: string; open?: string; high: any; low?: string; close?: string; volume?: string; }, responseDataList: any[]) => {
    return responseData.high >= Math.max(...responseDataList.map(item => parseFloat(item.high))) ? 'table-primary' : 'table-warning';
  };
  
  const getLowClass = (responseData: { timestamp?: string; open?: string; high?: string; low: any; close?: string; volume?: string; }, responseDataList: any[]) => {
    return responseData.low <= Math.min(...responseDataList.map(item => parseFloat(item.low))) ? 'table-primary' : 'table-warning';
  };


  return (
    <div>
      <div className="row row-cols-2 mt-2">
        
        <div className="col-12">
          <h2 className="text-center mt-5">Token Page</h2>
        </div>

        <div className="col-12">
          
          <form className="login-form border-top" onSubmit={handleSubmit}>
              
            <div className="form-group row g-5 m-2">
              <div className="col-auto">
                <input className="form-control" type="text" placeholder="" value={exchange} onChange={(e) => setExchange(e.target.value)}/>
              </div>

              <div className="col-auto">
                <input className="form-control" type="text" placeholder="41011" onChange={(e) => setToken(e.target.value)}/>
              </div>
              
              <div className="col-auto">
                <input className="form-control" type="text" placeholder="FIVE_MINUTE" onChange={(e) => seItnterval(e.target.value)}/>
              </div>
              
              <div className="col-auto">
                <input className="form-control" type="text" placeholder="2023-12-01 09:30" onChange={(e) => setFromdate(e.target.value)}/>
              </div>
              
              <div className="col-auto">
                <input className="form-control" type="text" placeholder="2023-12-01 09:45" onChange={(e) => setTodate(e.target.value)}/>
              </div>
              
              <div className="col-auto">
                <button className="btn btn-primary btn" type="submit">DONE</button>
              </div>

            </div>

          </form>

          <table className="table table-bordered mt-5 border">

            <thead>
              <tr>
                <th>timestamp</th>
                <th>open</th>
                <th>high</th>
                <th>low</th>
                <th>close</th>
                <th>volume</th>
              </tr>
            </thead>

            <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>
                  <span className="placeholder col-12 bg-secondary"></span>
                </td>
              </tr>
              // <tr>
              //   <td colSpan={6} className="text-center">Loading...</td>
              // </tr>
            ) : (
              responseDataList.map((responseData, index) => (
                <tr key={index}>
                  <td>{new Date(responseData.timestamp).toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}).slice(0, 16).replace('T', ' ')}</td>
                  <td>{responseData.open}</td>
                  <td className={getHighClass(responseData, responseDataList)}>{responseData.high}</td>
                  <td className={getLowClass(responseData, responseDataList)}>{responseData.low}</td>
                  <td>{responseData.close}</td>
                  <td>{responseData.volume}</td>
                </tr>
              ))
            )}
            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
};

export default TokenPage;

