import React from 'react'

const APIHeaders = {
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    PW_API_KEY: import.meta.env.VITE_PW_API_KEY,
    'CF-Access-Client-Id': import.meta.env.VITE_CF_CLIENT_ID,
    'CF-Access-Client-Secret': import.meta.env.VITE_CF_CLIENT_SECRET,
  },
}

export default APIHeaders
