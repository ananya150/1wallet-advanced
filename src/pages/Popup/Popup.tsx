import React, { useState, useEffect } from 'react'
import './index.css'
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/SignUp';
import AccountSetUp from './components/AccountSetUp';
import { init } from './utils/web3authUtils';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Adjust this value as per your requirement
  },
}));

const Popup = () => {

  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState<any>(false)
  const [web3Auth, setWeb3Auth] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);

  const initializeWeb3Auth = async () => {
    const initValues = await init();
    setIsLoggedIn(initValues?.isLoggedIn);
    setWeb3Auth(initValues?.web3auth);
    setProvider(initValues?.provider);
    setLoading(false);
  }

  useEffect(() => {
    chrome.runtime.sendMessage({header: "getInfo/isInitialized"} , function(response){
      if(response.message){
        setIsInitialized(true);
        setLoading(false);
      } 
      else {
        initializeWeb3Auth();
      }
    })
  },[])


  return (
    <div >
      {loading? 
        <div className={classes.container}>
          <CircularProgress sx={{color: 'white'}} />
        </div>
        :
        <div>
            {isInitialized? 
              <div>
                <Routes>
                  <Route path='/' element={<Login />} />
                  <Route path='/home' element={<Home/>} />
                </Routes>
              </div>
            : 
              <div>
                <Routes>
                  <Route path='/' element={
                    !isLoggedIn? <SignUp web3Auth={web3Auth} setProvider={setProvider} setIsLoggedIn={setIsLoggedIn} /> : <AccountSetUp web3Auth={web3Auth} setIsLoggedIn={setIsLoggedIn} /> 
                  } />
                </Routes>
              </div>
            }
        </div>
      }
    </div>
  )
}

export default Popup