import React from 'react'

const APIKEYS = {
  headers: {
    PW_API_KEY: import.meta.env.VITE_PW_API_KEY,
    'CF-Access-Client-Id': import.meta.env.VITE_CF_CLIENT_ID,
    'CF-Access-Client-Secret': import.meta.env.VITE_CF_CLIENT_SECRET,
  },
}

export default APIKEYS
