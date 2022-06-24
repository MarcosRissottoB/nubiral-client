import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { getHostApi } from './api/hosts';
import Table from '../components/Table';

const Home: NextPage = () => {
  const [keysData, setKeysData] = useState<string[]>([]);
  const [valuesData, setValuesData] = useState<[]>([]);
  const [token, setToken] = useState('');
  
  console.log('test github actions4343');

  const getHost = async (token: string) => {
    const response = await getHostApi(token); 
    if(response) {
      let keys = Object.keys(response[0]) ;
      setKeysData(keys);
      let values = response.map((item: {}) => Object.values(item));
      setValuesData(values || {}); 
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    setToken(token);
    if(token) getHost(token)
  }, [token]);

  return (
    <div className="home">
      {!token ?
        <div>
          <h1>Host List</h1>
          <span>Debes loguearte primero</span>
        </div>
        : <div>
          <h1>Host List</h1>
          <Table keysData={keysData} tableData={valuesData}/>
        </div>
      }
    </div>
  )
}

export default Home;
