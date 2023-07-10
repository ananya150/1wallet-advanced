import React, { useState, useEffect } from 'react'
import './index.css'
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';



const Popup = () => {

  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    chrome.runtime.sendMessage({header: "getInfo/isInitialized"} , function(response){
      if(response.message) setIsInitialized(true);
      setLoading(false);
    })
  },[])


  return (
    <div className="container">
      {loading? 
        <CircularProgress color='inherit' /> :
        <div>
            {isInitialized? "Wallet Found" : "Wallet not found"}
        </div>
      }
    </div>
  )
}

export default Popup