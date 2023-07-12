import React, { useState, useEffect } from 'react'
import './index.css'
import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/SignUp';
import AccountSetUp from './components/AccountSetUp';
import { init } from './utils/web3authUtils';
import SetUpPassword from './components/SetUpPassword';
import { isInitialized } from '../utils';
import Send from './components/Send';
import Deposit from './components/Deposit';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Adjust this value as per your requirement
  },
}));

const Popup = () => {

  const [walletExist, setWalletExist] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState<any>(false)
  const [web3Auth, setWeb3Auth] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [name,setName] = useState<any>('');
  const [walletAddress, setWalletAddress] = useState<any>('')

  const initializeWeb3Auth = async () => {
    const initValues = await init();
    setIsLoggedIn(initValues?.isLoggedIn);
    setWeb3Auth(initValues?.web3auth);
    setProvider(initValues?.provider);
    setLoading(false);
  }

  const check = async () => {
    const isWalletInitialized = await isInitialized();
    if(isWalletInitialized) {
      setWalletExist(true);
      setLoading(false);
    }else{
      initializeWeb3Auth()
    }
  }

  useEffect(() => {
    check();
  },[])


  return (
    <div >
      {loading? 
        <div className={classes.container}>
          <CircularProgress sx={{color: 'white'}} />
        </div>
        :
        <div>
            {walletExist? 
              <div>
                <Routes>
                  <Route path='/' element={<Login />} />
                  <Route path='/home' element={<Home/>} />
                  <Route path='/send' element={<Send />} />
                  <Route path='/deposit' element={<Deposit />} />
                </Routes>
              </div>
            : 
              <div>
                <Routes>
                  <Route path='/' element={
                    !isLoggedIn? <SignUp web3Auth={web3Auth} setProvider={setProvider} setIsLoggedIn={setIsLoggedIn} /> : <AccountSetUp web3Auth={web3Auth} setIsLoggedIn={setIsLoggedIn} provider={provider} setName={setName} walletAddress={walletAddress} setWalletAddress={setWalletAddress} /> 
                  } />
                  <Route path="/setUpPassword" element={<SetUpPassword provider={provider} name={name} web3Auth={web3Auth} setIsLoggedIn={setIsLoggedIn} walletAddress={walletAddress} />} />
                  <Route path='/home' element={<Home/>} />
                  <Route path='/send' element={<Send />} />
                  <Route path='/deposit' element={<Deposit />} />
                </Routes>
              </div>
            }
        </div>
      }
    </div>
  )
}

export default Popup