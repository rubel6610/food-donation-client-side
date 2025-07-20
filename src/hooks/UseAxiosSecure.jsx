import axios from 'axios';
import React from 'react';
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
});

const UseAxiosSecure = () => {
    return instance
};

export default UseAxiosSecure;