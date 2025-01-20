import { useState, useEffect } from 'react';
import { fetchToken } from '../Api/Api';
import { makePostRequest } from '../Api/Auth+++++++++++++++++++++++++++';

const useAuth = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedToken = await fetchToken();
      setToken(fetchedToken);
    };
    fetchData();
  }, []);
  
  const login = async (email, password) => {
    const data = { username: email, password };
    const result = await makePostRequest('https://sandbox.techembryo.com/users/api/user/v1/login', data, token);
    return result;
  };

  return { token, login };
};

export default useAuth;
